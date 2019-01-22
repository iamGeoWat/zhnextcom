const https = require('https')
const moment = require('moment')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')
const apiInfo = require('./config/api')
const axios = require('axios')

const api_key = apiInfo.okex_huang.api_key
const sec_key = apiInfo.okex_huang.sec_key
const passphrase = apiInfo.okex_huang.passphrase
// Huang




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
  totalEquityInBTC: 0,
  totalEquityInUSD: 0
}

var timestamp = new Date();
timestamp.setHours(timestamp.getHours(), timestamp.getMinutes());

var walletSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/account/v3/wallet', sec_key))
const walletInfoOpt = {
  host: 'www.okex.com',
  path: '/api/account/v3/wallet',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': api_key,
    'OK-ACCESS-SIGN': walletSign,
    'OK-ACCESS-PASSPHRASE': passphrase,
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
    for (var i = 0; i < result.length; i++) {
      if (result[i].currency === 'BTC') {
        // console.log(result[i].balance)
        accountContainer.btc.wallet = result[i].balance
      }
      if (result[i].currency === 'EOS') {
        accountContainer.eos.wallet = result[i].balance
      }
      if (result[i].currency === 'USDT') {
        accountContainer.usdt.wallet = result[i].balance
      }
    }
    // console.log(accountContainer)
  })
})
walletInfoGrabber.on('error', (e) => {
  console.error(e);
});

var b2bSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/spot/v3/accounts', sec_key))
const b2bInfoOpt = {
  host: 'www.okex.com',
  path: '/api/spot/v3/accounts',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': api_key,
    'OK-ACCESS-SIGN': b2bSign,
    'OK-ACCESS-PASSPHRASE': passphrase,
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
        accountContainer.btc.b2b = result[i].balance
      }
      if (result[i].currency === 'EOS') {
        accountContainer.eos.b2b = result[i].balance
      }
      if (result[i].currency === 'USDT') {
        accountContainer.usdt.b2b = result[i].balance
      }
    }
    // console.log(accountContainer)
  })
})
b2bInfoGrabber.on('error', (e) => {
  console.error(e);
});

var contractSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp.toISOString() + 'GET' + '/api/futures/v3/accounts', sec_key))
const contractInfoOpt = {
  host: 'www.okex.com',
  path: '/api/futures/v3/accounts',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': api_key,
    'OK-ACCESS-SIGN': contractSign,
    'OK-ACCESS-PASSPHRASE': passphrase,
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
    console.log(result)
    
    for (var token in result.info) {
      if (token === 'btc') {
        accountContainer.btc.contract = result.info[token].equity
      }
      if (token === 'eos') {
        accountContainer.eos.contract = result.info[token].equity
      }
    }
  })
})
contractInfoGrabber.on('error', (e) => {
  console.error(e);
});

walletInfoGrabber.end()
b2bInfoGrabber.end()
contractInfoGrabber.end()

setInterval(() => {
  console.log(accountContainer)
}, 5000)

var priceEngine = setInterval(() => {
  var eosTotal = 0
  var btcTotal = 0
  var usdtTotal = 0
  axios.get('https://api.bitfinex.com/v2/ticker/tEOSUSD').then((res) => {
    console.log(res.data[0])
    for (var item in accountContainer.eos) {
      // console.log(accountContainer.eos[item])
      eosTotal += parseFloat(accountContainer.eos[item])
      // console.log('for: '+eosTotal)
    }
    eosTotal = eosTotal * res.data[0]
    // console.log('total: ' + eosTotal)
    axios.get('https://api.bitfinex.com/v2/ticker/tBTCUSD').then((res) => {
      console.log('btc usdt:' + res.data[0])
      for (var item in accountContainer.btc) {
        console.log(accountContainer.btc[item])
        btcTotal += parseFloat(accountContainer.btc[item])
      }
      console.log('btc before: ' + btcTotal)
      btcTotal = btcTotal * res.data[0]
      for (var i in accountContainer.usdt) {
        usdtTotal += parseFloat(accountContainer.usdt[i])
      }
      console.log('ysdt: '+ usdtTotal)
      console.log('btc: ' + btcTotal)
      accountContainer.totalEquityInUSD = (eosTotal + btcTotal + usdtTotal).toFixed(4)
      axios.get('https://api.bitfinex.com/v2/ticker/tBTCUSD').then((res) => {
        accountContainer.totalEquityInBTC = (accountContainer.totalEquityInUSD / res.data[0]).toFixed(4)
        console.log(accountContainer)
      })
    })
  })
}, 10000)