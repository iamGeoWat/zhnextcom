var path = require('path');
var history = require('connect-history-api-fallback')

const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '/mobile/dist')));
app.use(history({
  verbose: true,
  index: '/'
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/mobile/dist/index.html')))

app.listen(8898, () => console.log('fund_app mobile is running at port 8898.'))