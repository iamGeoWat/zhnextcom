const https = require('https')
const axios = require('axios')
const moment = require('moment')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')
const apiInfo = require('./config/api')

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
  [{}, {}],
  [{}, {}],
  [{}, {}],
  [{}, {}]
]

var accountContainer = [
  {
    btc: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    eos: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    usdt: {
      wallet: 0,
      b2b: 0
    },
    totalBTCInUSD: 0,
    totalEOSInUSD: 0,
    totalUSDTInUSD: 0,
    totalEquityInBTC: 0,
    totalEquityInUSD: 0
  },
  {
    btc: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    eos: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    usdt: {
      wallet: 0,
      b2b: 0
    },
    totalBTCInUSD: 0,
    totalEOSInUSD: 0,
    totalUSDTInUSD: 0,
    totalEquityInBTC: 0,
    totalEquityInUSD: 0
  },
  {
    btc: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    eos: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    usdt: {
      wallet: 0,
      b2b: 0
    },
    totalBTCInUSD: 0,
    totalEOSInUSD: 0,
    totalUSDTInUSD: 0,
    totalEquityInBTC: 0,
    totalEquityInUSD: 0
  },
  {
    btc: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    eos: {
      wallet: 0,
      b2b: 0,
      contract: 0
    },
    usdt: {
      wallet: 0,
      b2b: 0
    },
    totalBTCInUSD: 0,
    totalEOSInUSD: 0,
    totalUSDTInUSD: 0,
    totalEquityInBTC: 0,
    totalEquityInUSD: 0
  }
]

//fetch data
async function positionCylinder(apiName) {
  var timestamp = new Date();
  timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());
  var positionSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/futures/v3/position', apiInfo[apiName].sec_key))
  const positionInfoOpt = {
    host: 'www.okex.com',
    path: '/api/futures/v3/position',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': apiInfo[apiName].api_key,
      'OK-ACCESS-SIGN': positionSign,
      'OK-ACCESS-PASSPHRASE': apiInfo[apiName].passphrase,
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
      if (JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).holding !== undefined) {
        infoContainer[apiInfo[apiName].userid - 1][0] = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).holding[0]
        modifyPositionData(infoContainer[apiInfo[apiName].userid - 1][0], infoContainer[apiInfo[apiName].userid - 1][0])
      }
    })
  })
  positionInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  positionInfoGrabber.end()
}
var positionEngine = setInterval(() => {
  for (apiName in apiInfo) {
    positionCylinder(apiName)
  }
}, 10000)

async function accountCylinder(apiName) {
  var timestamp = new Date();
  timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());
  
  var walletSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/account/v3/wallet', apiInfo[apiName].sec_key))
  const walletInfoOpt = {
    host: 'www.okex.com',
    path: '/api/account/v3/wallet',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': apiInfo[apiName].api_key,
      'OK-ACCESS-SIGN': walletSign,
      'OK-ACCESS-PASSPHRASE': apiInfo[apiName].passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
    }
  }
  const walletInfoGrabber = https.request(walletInfoOpt, (res) => {
    var dataArr = []
    var dataArrLen = 0
    res.on('data', (d) => {
      dataArr.push(d)
      dataArrLen += d.length
    })
    res.on('end', () => {
      var result = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString())
      // console.log(result)
      for (var i = 0; i < result.length; i++) {
        if (result[i].currency === 'BTC') {
          // console.log(result[i].balance)
          accountContainer[apiInfo[apiName].userid - 1].btc.wallet = result[i].balance
        }
        if (result[i].currency === 'EOS') {
          accountContainer[apiInfo[apiName].userid - 1].eos.wallet = result[i].balance
        }
        if (result[i].currency === 'USDT') {
          accountContainer[apiInfo[apiName].userid - 1].usdt.wallet = result[i].balance
        }
      }
      // console.log(accountContainer)
    })
  })
  walletInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  
  var b2bSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/spot/v3/accounts', apiInfo[apiName].sec_key))
  const b2bInfoOpt = {
    host: 'www.okex.com',
    path: '/api/spot/v3/accounts',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': apiInfo[apiName].api_key,
      'OK-ACCESS-SIGN': b2bSign,
      'OK-ACCESS-PASSPHRASE': apiInfo[apiName].passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
    }
  }
  const b2bInfoGrabber = https.request(b2bInfoOpt, (res) => {
    var dataArr = []
    var dataArrLen = 0
    res.on('data', (d) => {
      dataArr.push(d)
      dataArrLen += d.length
    })
    res.on('end', () => {
      var result = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString())
      // console.log(result)
      for (var i = 0; i < result.length; i++) {
        if (result[i].currency === 'BTC') {
          // console.log(result[i].balance)
          accountContainer[apiInfo[apiName].userid - 1].btc.b2b = result[i].balance
        }
        if (result[i].currency === 'EOS') {
          accountContainer[apiInfo[apiName].userid - 1].eos.b2b = result[i].balance
        }
        if (result[i].currency === 'USDT') {
          accountContainer[apiInfo[apiName].userid - 1].usdt.b2b = result[i].balance
        }
      }
      // console.log(accountContainer)
    })
  })
  b2bInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  
  var contractSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/futures/v3/accounts', apiInfo[apiName].sec_key))
  const contractInfoOpt = {
    host: 'www.okex.com',
    path: '/api/futures/v3/accounts',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': apiInfo[apiName].api_key,
      'OK-ACCESS-SIGN': contractSign,
      'OK-ACCESS-PASSPHRASE': apiInfo[apiName].passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
    }
  }
  const contractInfoGrabber = https.request(contractInfoOpt, (res) => {
    var dataArr = []
    var dataArrLen = 0
    res.on('data', (d) => {
      dataArr.push(d)
      dataArrLen += d.length
    })
    res.on('end', () => {
      var result = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString())
      // console.log(result.info.eos.equity)
      // console.log(result.info.btc.equity)
      for (var token in result.info) {
        if (token === 'btc') {
          accountContainer[apiInfo[apiName].userid - 1].btc.contract = result.info[token].equity
        }
        if (token === 'eos') {
          accountContainer[apiInfo[apiName].userid - 1].eos.contract = result.info[token].equity
        }
      }
      if (JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).info) {
        infoContainer[apiInfo[apiName].userid - 1][1] = JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).info
        modifyAccountData(infoContainer[apiInfo[apiName].userid - 1][1], infoContainer[apiInfo[apiName].userid - 1][1])
      }
      // console.log(accountContainer)
    })
  })
  contractInfoGrabber.on('error', (e) => {
    console.error(e);
  });
  
  walletInfoGrabber.end()
  b2bInfoGrabber.end()
  contractInfoGrabber.end()
}

var accountEngine = setInterval(() => {
  for (apiName in apiInfo) {
    accountCylinder(apiName)
  }
}, 20000)

var priceEngine = setInterval(() => {
  axios.get('https://api.bitfinex.com/v2/ticker/tEOSUSD').then((res) => {
    for (var accountIndex in accountContainer) {
      var eosTotal = 0
      for (var item in accountContainer[accountIndex].eos) {
        eosTotal += parseFloat(accountContainer[accountIndex].eos[item])
      }
      eosTotal = eosTotal * res.data[0]
      accountContainer[accountIndex].totalEOSInUSD = eosTotal
    }
  
    axios.get('https://api.bitfinex.com/v2/ticker/tBTCUSD').then((res) => {
      for (var accountIndex in accountContainer) {
        var btcTotal = 0
        for (var item in accountContainer[accountIndex].btc) {
          btcTotal += parseFloat(accountContainer[accountIndex].btc[item])
        }
        btcTotal = btcTotal * res.data[0]
        
        var usdtTotal = 0
        for (var i in accountContainer[accountIndex].usdt) {
          usdtTotal += parseFloat(accountContainer[accountIndex].usdt[i])
        }
        accountContainer[accountIndex].totalEquityInUSD = (accountContainer[accountIndex].totalEOSInUSD + btcTotal + usdtTotal).toFixed(4)
        accountContainer[accountIndex].totalBTCInUSD = btcTotal
        accountContainer[accountIndex].totalUSDTInUSD = usdtTotal
        accountContainer[accountIndex].totalEquityInBTC = (accountContainer[accountIndex].totalEquityInUSD / res.data[0]).toFixed(4)
      }
    }).catch((error => console.log('BTC price error')))
  }).catch(error => console.log('EOS price error'))
}, 10000)

var seeThruEngine = setInterval(() => {
  // console.log(infoContainer)
  console.log(accountContainer)
}, 10000)


//interfaces
app.get('/dot1h', async (req, res) => {
  var result = await dotDao.queryPRTimeByIdAndIntvType(1, 1)
  res.send(result)
})
app.get('/dot6h', async (req, res) => {
  var result = await dotDao.queryPRTimeByIdAndIntvType(1, 2)
  res.send(result)
})
app.get('/dotDay', async (req, res) => {
  var result = await dotDao.queryPRTimeByIdAndIntvType(1, 3)
  res.send(result)
})
app.get('/dotWeek', async (req, res) => {
  var result = await dotDao.queryPRTimeByIdAndIntvType(1, 4)
  res.send(result)
})
app.get('/dotMonth', async (req, res) => {
  var result = await dotDao.queryPRTimeByIdAndIntvType(1, 5)
  res.send(result)
})
app.get('/infoContainer', (req, res) => res.send(JSON.stringify(infoContainer)))
app.get('/equity', (req, res) => res.send(JSON.stringify(accountContainer)))
app.get('/pie', (req, res) => {
  var resData = [
    {value: 0, name: 'BTC'},
    {value: 0, name: 'EOS'},
    {value: 0, name: 'USDT'}
  ]
  // resData[0].value = accountContainer.totalBTCInUSD
  // resData[1].value = accountContainer.totalEOSInUSD
  // resData[2].value = accountContainer.totalUSDTInUSD
  resData[0].value = 28.4
  resData[1].value = 14.8
  resData[2].value = 56.8
  //todo: 改成外部文件
  res.send(JSON.stringify(resData))
})
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
  var resData = { startEquity: '', weeklyProfitRatio: '', currentProfit: '', currentProfitRatio: '', estimatedYearly: '', equityRatio: '', runningTime: '', totalEquity: '' }
  resData.startEquity = parseFloat(userInfo.start_equity).toFixed(3)
  let currentEquity = parseFloat(accountContainer[userid - 1].totalEquityInBTC).toFixed(3)
  if (dotWeek.length >= 1) {
    let lastWeekEquity = dotWeek[dotWeek.length - 1].equity
    resData.weeklyProfitRatio = (((currentEquity - lastWeekEquity) / lastWeekEquity)*100).toFixed(3)
  }
  resData.currentProfit = (currentEquity - userInfo.start_equity).toFixed(3)
  resData.currentProfitRatio = (((currentEquity - userInfo.start_equity) / userInfo.start_equity)*100).toFixed(3)
  resData.equityRatio = (parseFloat(resData.currentProfitRatio)/100 + 1).toFixed(3)
  var startDate = new Date(userInfo.start_date)
  startDate = moment(startDate)
  resData.runningTime = currentDate.diff(startDate, 'days') + 1
  resData.estimatedYearly = (((((currentEquity - userInfo.start_equity) / userInfo.start_equity) * 100)/resData.runningTime) * 365).toFixed(3)
  resData.totalEquity = currentEquity
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