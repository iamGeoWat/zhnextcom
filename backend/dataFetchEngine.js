const https = require('https')
const moment = require('moment')
const bodyParser = require('body-parser')
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
app.use(bodyParser.json())

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

const UserDao = require('./dao/UserDao')
const userDao = new UserDao()

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

var accountContainer = []
var accountEngine = setInterval(() => {
  
})







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

var contractAccountEngine = setInterval(() => {
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
  var result = await dotDao.queryEquityTimeByIdAndIntvType(1, 1)
  res.send(result)
})
app.get('/dot6h', async (req, res) => {
  var result = await dotDao.queryEquityTimeByIdAndIntvType(1, 2)
  res.send(result)
})
app.get('/dotDay', async (req, res) => {
  var result = await dotDao.queryEquityTimeByIdAndIntvType(1, 3)
  res.send(result)
})
app.get('/dotWeek', async (req, res) => {
  var result = await dotDao.queryEquityTimeByIdAndIntvType(1, 4)
  res.send(result)
})
app.get('/dotMonth', async (req, res) => {
  var result = await dotDao.queryEquityTimeByIdAndIntvType(1, 5)
  res.send(result)
})
app.get('/info', (req, res) => res.send(JSON.stringify(infoContainer[0])))
app.post('/login', async (req, res) => {
  let failPwd = { code: 1, content: 'wrong password'}
  let failUsn = { code: 2, content: 'wrong username'}
  let failUkn = { code: 3, content: 'unknown error'}
  let pass = { code: 0, content: 'success', userid: ''}
  var account = req.body
  var queryResult = await userDao.queryPasswordByUsername(account.username)
  if (queryResult.length === 0) {
    res.send(JSON.stringify(failUsn))
  } else if (queryResult[0].password !== account.password) {
    res.send(JSON.stringify(failPwd))
  } else if (queryResult[0].password === account.password) {
    pass.userid = await userDao.queryByUsername(account.username)
    pass.userid = pass.userid[0].UID
    res.send(JSON.stringify(pass))
  } else {
    res.send(JSON.stringify(failUkn))
  }
})
app.post('/showInfo', async (req, res) => {
  var currentDate = new Date()
  currentDate = moment(currentDate)
  let userid = req.body.userid
  let userInfo = await userDao.queryByUserID(userid)
  let dotWeek = await dotDao.queryDotByIdAndIntvType(userid, 4)
  userInfo = userInfo[0]
  // console.log(userInfo)
  var resData = { startEquity: '', weeklyProfitRatio: '', currentProfit: '', currentProfitRatio: '', estimatedYearly: '', equityRatio: '', runningTime: '' }
  resData.startEquity = userInfo.start_equity
  let currentEquity = infoContainer[0][1]['eos'].equity
  // console.log(dotWeek)
  if (dotWeek.length >= 1) {
    let lastWeekEquity = dotWeek[dotWeek.length - 1].equity
    resData.weeklyProfitRatio = (((currentEquity - lastWeekEquity) / lastWeekEquity)*100).toFixed(4)
  }
  resData.currentProfit = (currentEquity - userInfo.start_equity).toFixed(4)
  resData.currentProfitRatio = (((currentEquity - userInfo.start_equity) / userInfo.start_equity)*100).toFixed(4)
  resData.equityRatio = (((currentEquity - userInfo.start_equity) / userInfo.start_equity) * 100).toFixed(4)
  var startDate = new Date(userInfo.start_date)
  startDate = moment(startDate)
  resData.runningTime = currentDate.diff(startDate, 'days') + 1
  // console.log(resData.runningTime)
  resData.estimatedYearly = (((((currentEquity - userInfo.start_equity) / userInfo.start_equity) * 100)/resData.runningTime) * 365).toFixed(4)
  //todo:把equity改成账户总净值
  res.send(JSON.stringify(resData))
})

app.listen(8877, () => console.log('data fetch and interface is running at port 8877.'))

// 需要数据：
// 1、初始资产S0
// 2、实时资产S1
// 3、每周结算时资产S2
// 4、开始日期D0
// 5、当前日期D1
// 初始净值：S0
// 周收益率 Z：（S1-S2）/S2*100%
// 累积收益S：S1-S0
// 累积收益率 W：（S1-S0）/S0*100%
// 动态年化Y：（S1-S0）/S0*100%/(T1-T0)*365=W/T*365
// 净值：W/100%
// 运行时间T：D1-D0