const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

var infoContainer = [
  [{}, {}]
]

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
  if (infoContainer[0] !== 'error' && JSON.stringify(infoContainer[0][1]) !== '{}') {
    var equity = infoContainer[0][1]['eos'].equity
    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var dotInfo = [equity, time, intvType, apiID, null]
    console.log(dotInfo)
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
        console.log(writeCount)
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
      console.log(writeCount)
  
    }
  }
}

function operationWrite () {}
//todo:记录新操作

function app() {
  writeCount = fs.readFileSync('./config/writecount.txt')
  console.log(writeCount.toString())
  var dataEngine = setInterval(() => {
    axios.get('http://localhost:8877/info')
      .then((res) => {
        infoContainer[0] = res.data
      })
      .catch((err) => {
        infoContainer[0] = 'error'
      })
  }, 1000)
  console.log('data engine engaged.')
  // var dataWriteEngine = setInterval(classifiedWrite, 3600000)
  var dataWriteEngine = setInterval(classifiedWrite, 5000)
  console.log('write engine engaged.')
}

app()