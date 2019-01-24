const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

var accountContainer = {
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

var showInfo = {
  startEquity: '',
  weeklyProfitRatio: '',
  currentProfit: '',
  currentProfitRatio: '',
  estimatedYearly: '',
  equityRatio: '',
  runningTime: '',
  totalEquity: ''
}

var writeCount = 0

async function ifEquityChanged(currentEquity) {
  var savedEquity = await dotDao.queryLatestByIntvType(1)
  return currentEquity !== savedEquity;
}

function classifiedWrite () {
  if (writeCount % 6 === 0) {
    dotWrite(2, 1)
  }
  if (writeCount % 24 === 0) {
    dotWrite(3, 1)
  }
  if (writeCount % 168 === 0) {
    dotWrite(4, 1)
  }
  if (writeCount % 672 === 0) {
    dotWrite(5, 1)
  }
  dotWrite(1, 1)
}

async function dotWrite (intvType, apiID) {
  console.log(accountContainer)
  if (accountContainer !== 'error' && accountContainer.totalEquityInBTC !== 0) {
    console.log(accountContainer)
    var equity = accountContainer.totalEquityInBTC
    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var profitRatio = showInfo.currentProfitRatio
    var dotInfo = [equity, profitRatio, time, intvType, apiID, null]
    // console.log(dotInfo)
    if (intvType === 1) {
      if (await ifEquityChanged(equity)) {
        await dotDao.addDot(dotInfo)
        writeCount++
        writeCount = writeCount % 673
        fs.writeFile('./config/writecount.txt', writeCount, (err) => {
          if (err) {
            return console.error(err)
          }
        })
        // console.log(writeCount)
      }
    } else {
      await dotDao.addDot(dotInfo)
      writeCount++
      writeCount = writeCount % 673
      fs.writeFile('./config/writecount.txt', writeCount, (err) => {
        if (err) {
          return console.error(err)
        }
      })
      // console.log(writeCount)
  
    }
  }
}

function operationWrite () {}
//todo:记录新操作

function app() {
  writeCount = fs.readFileSync('./config/writecount.txt')
  console.log(writeCount.toString())
  var dataEngine = setInterval(() => {
    axios.get('http://localhost:8877/equity')
      .then((res) => {
        accountContainer = res.data
      })
      .catch((err) => {
        console.log(err)
        accountContainer = 'error'
      })
    axios.post('http://localhost:8877/showInfo', {userid: 1})
      .then((res) => {
        showInfo = res.data
      })
      .catch((err) => {
        console.log(err)
        showInfo = 'error'
      })
  }, 1000)
  console.log('data engine engaged.')
  var dataWriteEngine = setInterval(classifiedWrite, 3600000)
  // var dataWriteEngine = setInterval(classifiedWrite, 5000)
  console.log('write engine engaged.')
}

app()