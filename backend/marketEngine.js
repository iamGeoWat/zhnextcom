const axios = require('axios')
const express = require('express')
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var priceData = [
  [0], //0 binance
  [0, 0], //1 bitfinex
  [0],//2 bitmex
  [0],//3 bitstamp
  [0],//4 coinbase
  [0],//5 huobi
  [0],//6 kraken
  [0],//7 okex
  [0, 0, 0, 0, 0]//8 okex
]
function fetchPriceData() {
  try {
    axios.get('https://api.coinbase.com/v2/prices/LTC-USD/spot').then((res)=>{
      // console.log(res.data.data.amount)
      priceData[4][0] = res.data.data.amount
    })
    axios.get('https://api.huobi.pro/market/trade?symbol=eosusdt').then((res)=>{
      // console.log(res.data.tick.data[0].price)
      priceData[5][0] = res.data.tick.data[0].price
    })
    axios.get('https://api.kraken.com/0/public/Ticker?pair=xrpusd').then((res)=>{
      // console.log(res.data.result.XXRPZUSD.c[0])
      priceData[6][0] = res.data.result.XXRPZUSD.c[0]
    })
    axios.get('https://www.bitstamp.net/api/v2/ticker/btcusd').then((res)=>{
      // console.log(res.data.last)
      priceData[3][0] = res.data.last
    })
    axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT').then((res)=>{
      // console.log(res.data.price)
      priceData[0][0] = res.data.price
    })
    axios.get('https://www.bitmex.com/api/v1/trade?symbol=XBT&count=1&reverse=true').then((res)=>{
      // console.log(res.data[0].price)
      priceData[2][0] = res.data[0].price
    })
    axios.get('https://api.bitfinex.com/v2/ticker/tBTCUSD').then((res)=>{
      // console.log(res.data[6])
      priceData[1][0] = res.data[6]
    })
    axios.get('https://api.bitfinex.com/v2/ticker/tETHUSD').then((res)=>{
      // console.log(res.data[6])
      priceData[1][1] = res.data[6]
    })
    axios.get('https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker').then((res)=>{
      // console.log(res.data.last)
      priceData[7][0] = res.data.last
    })
    axios.get('https://www.okex.com/api/futures/v3/instruments').then((r1)=>{
      axios.get('https://www.okex.com/api/futures/v3/instruments/' + r1.data[2].instrument_id + '/ticker').then((r2)=>{
        // console.log(r2.data.last)
        priceData[8][0] = r2.data.last
      })
      axios.get('https://www.okex.com/api/futures/v3/instruments/' + r1.data[5].instrument_id + '/ticker').then((r3)=>{
        // console.log(r3.data.last)
        priceData[8][3] = r3.data.last
      })
      axios.get('https://www.okex.com/api/futures/v3/instruments/' + r1.data[8].instrument_id + '/ticker').then((r4)=>{
        // console.log(r4.data.last)
        priceData[8][2] = r4.data.last
        
      })
      axios.get('https://www.okex.com/api/futures/v3/instruments/' + r1.data[14].instrument_id + '/ticker').then((r5)=>{
        // console.log(r5.data.last)
        priceData[8][4] = r5.data.last
        
      })
      axios.get('https://www.okex.com/api/futures/v3/instruments/' + r1.data[23].instrument_id + '/ticker').then((r6)=>{
        // console.log(r6.data.last)
        priceData[8][1] = r6.data.last
        
      })
    })
  } catch (e) {
    console.log(e)
  }
}
fetchPriceData()
setInterval(()=>{
  fetchPriceData()
}, 10000)


app.get('/dominance', (req, res) => {
  axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '81185bf4-514a-400a-8e71-05cc1084ceeb'
    }
  }).then((r) => {
    res.send(JSON.stringify(r.data))
  })
})

app.get('/price', (req, res) => {
  res.send(JSON.stringify(priceData))
})

app.listen(8896, () => console.log('interface for market page started on port 8896.'))