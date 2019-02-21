const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

const CountDao = require('./dao/CountDao')
const countDao = new CountDao()

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

var showInfo = [
  {
    startEquity: '',
    weeklyProfitRatio: '',
    currentProfit: '',
    currentProfitRatio: '',
    estimatedYearly: '',
    equityRatio: '',
    runningTime: '',
    totalEquity: ''
  },
  {
    startEquity: '',
    weeklyProfitRatio: '',
    currentProfit: '',
    currentProfitRatio: '',
    estimatedYearly: '',
    equityRatio: '',
    runningTime: '',
    totalEquity: ''
  },
  {
    startEquity: '',
    weeklyProfitRatio: '',
    currentProfit: '',
    currentProfitRatio: '',
    estimatedYearly: '',
    equityRatio: '',
    runningTime: '',
    totalEquity: ''
  },
  {
    startEquity: '',
    weeklyProfitRatio: '',
    currentProfit: '',
    currentProfitRatio: '',
    estimatedYearly: '',
    equityRatio: '',
    runningTime: '',
    totalEquity: ''
  }
]

var userAmount = 0

// async function ifEquityChanged(currentEquity) {
//   var savedEquity = await dotDao.queryLatestByIntvType(1)
//   return currentEquity !== savedEquity;
// }

async function classifiedWrite (userIndex) {
  var rawWriteCount = await countDao.queryWriteCountByUID(userIndex + 1)
  var writeCount = rawWriteCount[0].wc
  console.log(writeCount)
  if (writeCount % 6 === 0) {
    dotWrite(2, userIndex+1, writeCount)
  }
  if (writeCount % 24 === 0) {
    dotWrite(3, userIndex+1, writeCount)
  }
  if (writeCount % 168 === 0) {
    dotWrite(4, userIndex+1, writeCount)
  }
  if (writeCount % 672 === 0) {
    dotWrite(5, userIndex+1, writeCount)
  }
  dotWrite(1, userIndex+1, writeCount)
}

async function dotWrite (intvType, apiID, writeCount) {
  // console.log(accountContainer)
  if (accountContainer[apiID-1] !== 'error' && accountContainer[apiID-1].totalEquityInBTC !== 0) {
    console.log(accountContainer)
    var equity = accountContainer[apiID-1].totalEquityInBTC
    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var profitRatio = showInfo[apiID-1].currentProfitRatio
    var dotInfo = [equity, profitRatio, time, intvType, apiID, null]
    if (intvType === 1) {
      await dotDao.addDot(dotInfo)
      writeCount++
      writeCount = writeCount % 673
      console.log('new writecount: ' + writeCount)
      countDao.updateWriteCountByUID(writeCount, apiID)
    } else {
      await dotDao.addDot(dotInfo)
      writeCount++
      writeCount = writeCount % 673
      countDao.updateWriteCountByUID(writeCount, apiID)
    }
  }
}

function operationWrite () {}
//todo:记录新操作

async function showInfoRequest(userIndex) {
  await axios.post('http://localhost:8877/showInfo', {userid: userIndex + 1})
    .then((res) => {
      showInfo[userIndex] = res.data
      // console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
      showInfo[userIndex] = 'error'
    })
}

function app() {
  userAmount = fs.readFileSync('./config/useramount.txt')
  var dataEngine = setInterval(async () => {
    axios.get('http://localhost:8877/equity')
      .then((res) => {
        accountContainer = res.data
      })
      .catch((err) => {
        console.log(err)
        accountContainer = 'error'
      })
    for (var userIndex = 0; userIndex < userAmount; userIndex++) {
      await showInfoRequest(userIndex)
    }
  }, 5000)
  console.log('data engine engaged.')
  
  var dataWriteEngine = setInterval(() => {
    for (var userIndex = 0; userIndex < userAmount; userIndex++) {
      classifiedWrite(userIndex)
    }
  }, 360000)
  // for production use
  
  // var dataWriteEngine = setInterval(() => {
  //   for (var userIndex = 0; userIndex < userAmount; userIndex++) {
  //     classifiedWrite(userIndex)
  //   }
  // }, 10000)
  // for test use
  
  console.log('write engine engaged.')
}

app()