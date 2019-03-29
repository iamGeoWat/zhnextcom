const axios = require('axios')
const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/dominance', (req, res) => {
  axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '81185bf4-514a-400a-8e71-05cc1084ceeb'
    }
  }).then((r) => {
    res.send(JSON.stringify(r.data))
    // console.log(res.data)
  })
})

app.listen(8896, () => console.log('interface for market page started on port 8896.'))