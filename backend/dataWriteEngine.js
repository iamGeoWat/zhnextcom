const axios = require('axios')
const mysql = require('mysql')
const moment = require('moment')

const DotDao = require('./dao/DotDao')
const dotDao = new DotDao()

var infoContainer = [
  [{}, {}]
]

function doWrite (intvType, apiID) {
  if (infoContainer[0] !== 'error') {
    var equity = infoContainer[0][1]['eos'].equity
    var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var dotInfo = [equity, time, intvType, apiID, null]
    console.log(dotInfo)
    dotDao.addDot(dotInfo)
  }
}

setInterval(() => {
  axios.get('http://localhost:8877/info')
    .then((res) => {
      infoContainer[0] = res.data
    })
    .catch((err) => {
      infoContainer[0] = 'error'
    })
}, 1000)

var dataWriteEngine6h = setInterval(doWrite(1, 1), 21600000)
var dataWriteEngineDay = setInterval(doWrite(2, 1), 86400000)
var dataWriteEngineWeek = setInterval(doWrite(3, 1), 604800000)
var dataWriteEngineMonth = setInterval(doWrite(4, 1), 2592000000)