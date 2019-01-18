const DotDao = require('./DotDao')
const dotDao = new DotDao()

var dotInfo = [3456.13, '2019-01-17 11:53:07', 1, 1]

// dotDao.addDot(dotInfo)

app = async () => {
  var res = await dotDao.queryLatestByIntvType(2)
  console.log(res)
}

app()