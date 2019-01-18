const https = require('https')
const CryptoJS = require('crypto-js')
const apiInfo = require('./config/api')

const api_key = apiInfo.okex_huang.api_key
const sec_key = apiInfo.okex_huang.sec_key
const passphrase = apiInfo.okex_huang.passphrase
// Huang

const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

function modifyPositionData(source, target) {
  //modify position info
  if (source !== undefined) {
    var modPositionInfo = source
    // var accountInfo = source[1]
    for (var i = 0; i < modPositionInfo.length; i++) {
      var tokenName = modPositionInfo[i].instrument_id.substr(0, 3)
      var contractType = modPositionInfo[i].instrument_id.substr(8, 6)
      //to be fixed
      var lowercaseToken = tokenName.toLowerCase()
      modPositionInfo[i].instrument_id = { 'token': tokenName, 'type': contractType, 'lowercaseToken': lowercaseToken }
    }
    for (var i = 0; i < modPositionInfo.length; i++) {
      var short_pnl = modPositionInfo[i].short_margin * modPositionInfo[i].short_pnl_ratio.substring(0, 5)
      var short_pnl_ratio_percent = (Math.round(modPositionInfo[i].short_pnl_ratio * 10000) / 100).toFixed(2) + '%'
      modPositionInfo[i].short_pnl_ratio = { 'short_pnl': short_pnl, 'short_pnl_ratio': modPositionInfo[i].short_pnl_ratio, 'short_pnl_ratio_percent': short_pnl_ratio_percent }
    }
    for (var i = 0; i < modPositionInfo.length; i++) {
      var long_pnl = modPositionInfo[i].long_margin * modPositionInfo[i].long_pnl_ratio.substring(0, 5)
      var long_pnl_ratio_percent = (Math.round(modPositionInfo[i].long_pnl_ratio * 10000) / 100).toFixed(2) + '%'
      modPositionInfo[i].long_pnl_ratio = {
        'long_pnl': long_pnl, 'long_pnl_ratio': modPositionInfo[i].long_pnl_ratio, 'long_pnl_ratio_percent': long_pnl_ratio_percent
      }
    }
    target = modPositionInfo
  }
}

function modifyAccountData (source, target) {
  //modify account info
  if (source !== undefined) {
    var modAccountInfo = source
    for (var token in modAccountInfo) {
      
      var total_margin_frozen = 0
      for (var i = 0; i < modAccountInfo[token].contracts.length; i++) {
        total_margin_frozen += modAccountInfo[token].contracts[i].margin_frozen
      }
      modAccountInfo[token].position_ratio = (total_margin_frozen / modAccountInfo[token].equity * 100).toString().substr(0, 5) + '%'
      modAccountInfo[token].weeklyPnL = Math.round(modAccountInfo[token].equity - modAccountInfo[token].total_avail_balance)
      
      target = modAccountInfo
    }
  }
}

var infoContainer = [
  [{}, {}]
]









//fetch data
var positionEngine = setInterval(() => {
  var timestamp = new Date();
  timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());
  var positionSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/futures/v3/position', sec_key))
  const positionInfoOpt = {
    host: 'www.okex.com',
    path: '/api/futures/v3/position',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': api_key,
      'OK-ACCESS-SIGN': positionSign,
      'OK-ACCESS-PASSPHRASE': passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
    }
  }
  
  const positionInfoGrabber = https.request(positionInfoOpt, (res) => {
    var dataArr = []
    var dataArrLen = 0
    res.on('data', (d) => {
      dataArr.push(d)
      dataArrLen += d.length
    })
    res.on('end', () => {
      // console.log(JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()))
      if (JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).holding !== undefined) {
        infoContainer[0][0] = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).holding[0]
        modifyPositionData(infoContainer[0][0], infoContainer[0][0])
      }
    })
  })
  positionInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  positionInfoGrabber.end()
}, 5000)

var accountEngine = setInterval(() => {
  var timestamp = new Date();
  timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());
  var accountSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/futures/v3/accounts', sec_key))
  const accountInfoOpt = {
    host: 'www.okex.com',
    path: '/api/futures/v3/accounts',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': api_key,
      'OK-ACCESS-SIGN': accountSign,
      'OK-ACCESS-PASSPHRASE': passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
    }
  }
  
  const accountInfoGrabber = https.request(accountInfoOpt, (res) => {
    var dataArr = []
    var dataArrLen = 0
    res.on('data', (d) => {
      dataArr.push(d)
      dataArrLen += d.length
    })
    res.on('end', () => {
      if (JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).info) {
        infoContainer[0][1] = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).info
        modifyAccountData(infoContainer[0][1], infoContainer[0][1])
      }
    })
  })
  accountInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  accountInfoGrabber.end()
}, 10000)

var seeThruEngine = setInterval(() => {
  console.log(infoContainer[0])
}, 5000)


//interfaces
app.get('/dot1h', async (req, res) => {
  var result = await dotDao.queryDotByIdAndIntvType(1, 1)
  res.send(result)
})
app.get('/dot6h', async (req, res) => {
  var result = await dotDao.queryDotByIdAndIntvType(1, 2)
  res.send(result)
})
app.get('/dotDay', async (req, res) => {
  var result = await dotDao.queryDotByIdAndIntvType(1, 3)
  res.send(result)
})
app.get('/dotWeek', async (req, res) => {
  var result = await dotDao.queryDotByIdAndIntvType(1, 4)
  res.send(result)
})
app.get('/dotMonth', async (req, res) => {
  var result = await dotDao.queryDotByIdAndIntvType(1, 5)
  res.send(result)
})
app.get('/info', (req, res) => res.send(JSON.stringify(infoContainer[0])))

app.listen(8877, () => console.log('data fetch and interface is running at port 8877.'))