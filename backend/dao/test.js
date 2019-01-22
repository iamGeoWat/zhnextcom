const DotDao = require('./DotDao')
const dotDao = new DotDao()
const moment = require('moment')

const UserDao = require('./UserDao')
const userDao = new UserDao()

// var dotInfo = [3456.13, '2019-01-17 11:53:07', 1, 1]

// dotDao.addDot(dotInfo)

app = async () => {
  var res = await dotDao.queryDotByIdAndIntvType(1, 4)
  // var res = await userDao.queryPasswordByUsername('asd')
  // console.log()
  var date = new Date(res[0].time)
  var date1 = new Date()
  var a = moment(date)
  var b = moment(date1)
  
  console.log(a.diff(b, 'days'))
}

app()