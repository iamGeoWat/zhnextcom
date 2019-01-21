const DotDao = require('./DotDao')
const dotDao = new DotDao()

const UserDao = require('./UserDao')
const userDao = new UserDao()

// var dotInfo = [3456.13, '2019-01-17 11:53:07', 1, 1]

// dotDao.addDot(dotInfo)

app = async () => {
  // var res = await dotDao.queryEquityTime(1, 1)
  var res = await userDao.queryPasswordByUsername('asd')
  console.log(res.length)
}

app()