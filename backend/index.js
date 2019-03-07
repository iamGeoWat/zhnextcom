var path = require('path')
var history = require('connect-history-api-fallback')

const express = require('express')
const desktopApp = express()

//desktopApp
desktopApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
desktopApp.use(express.static(path.join(__dirname, '/desktop/dist')));
desktopApp.use(history({
  verbose: true,
  index: '/'
}));
desktopApp.get('/', (req, res) => res.sendFile(path.join(__dirname, '/desktop/dist/index.html')))
desktopApp.listen(8899, () => console.log('desktopApp is running at port 8899.'))


//mobileApp
const mobileApp = express()
mobileApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
mobileApp.use(express.static(path.join(__dirname, '/mobile/dist')));
mobileApp.use(history({
  verbose: true,
  index: '/'
}));
mobileApp.get('/', (req, res) => res.sendFile(path.join(__dirname, '/mobile/dist/index.html')))
mobileApp.listen(8898, () => console.log('mobileApp mobile is running at port 8898.'))


//yanshiApp
const yanshiApp = express()
yanshiApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
yanshiApp.use(express.static(path.join(__dirname, '/yanshi/dist')));
yanshiApp.use(history({
  verbose: true,
  index: '/'
}));
yanshiApp.get('/', (req, res) => res.sendFile(path.join(__dirname, '/yanshi/dist/index.html')))
yanshiApp.get('/withdraw', (req, res) => res.sendFile(path.join(__dirname, '/yanshi/dist/index.html')))
yanshiApp.listen(8897, () => console.log('yanshiApp is running at port 8897.'))