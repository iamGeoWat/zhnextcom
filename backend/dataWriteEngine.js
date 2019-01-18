const axios = require('axios')
const moment = require('moment')

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

var infoContainer = [
  [{}, {}]
]

function ifEquityChanged(currentEquity) {
  var savedEquity = dotDao.queryLatestByIntvType(1)
  return currentEquity !== savedEquity;
}

function dotWrite (intvType, apiID) {
  if (infoContainer[0] !== 'error') {
    var equity = infoContainer[0][1]['eos'].equity
    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var dotInfo = [equity, time, intvType, apiID, null]
    console.log(dotInfo)
    if (intvType === 1) {
      if (ifEquityChanged(equity)) {
        dotDao.addDot(dotInfo)
      }
    } else {
      dotDao.addDot(dotInfo)
    }
  }

}

function operationWrite () {}

setInterval(() => {
  axios.get('http://localhost:8877/info')
    .then((res) => {
      infoContainer[0] = res.data
    })
    .catch((err) => {
      infoContainer[0] = 'error'
    })
}, 1000)

var dataWriteEngine1h = setInterval(dotWrite(1, 1), 3600000)
var dataWriteEngine6h = setInterval(dotWrite(2, 1), 21600000)
var dataWriteEngineDay = setInterval(dotWrite(3, 1), 86400000)
var dataWriteEngineWeek = setInterval(dotWrite(4, 1), 604800000)
var dataWriteEngineMonth = setInterval(dotWrite(5, 1), 2592000000)