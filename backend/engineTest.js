const https = require('https')
const moment = require('moment')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')
const apiInfo = require('./config/api')

const api_key = apiInfo.okex_huang.api_key
const sec_key = apiInfo.okex_huang.sec_key
const passphrase = apiInfo.okex_huang.passphrase
// Huang




var timestamp = new Date();
timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());
var walletSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/account/v3/wallet', sec_key))
const walletInfoOpt = {
  host: 'www.okex.com',
  path: '/api/futures/v3/wallet',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': api_key,
    'OK-ACCESS-SIGN': walletSign,
    'OK-ACCESS-PASSPHRASE': passphrase,
    'OK-ACCESS-TIMESTAMP': timestamp.toISOString()
  }
}
const accountInfoGrabber = https.request(walletInfoOpt, (res) => {
  var dataArr = []
  var dataArrLen = 0
  res.on('data', (d) => {
    dataArr.push(d)
    dataArrLen += d.length
  })
  res.on('end', () => {
    // if (JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()).info) {
    //
    // }
    console.log( JSON.parse(Buffer.concat(dataArr, dataArrLen).toString()) )
  })
})
accountInfoGrabber.on('error', (e) => {
  console.error(e);
});
accountInfoGrabber.end()