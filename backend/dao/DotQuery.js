module.exports = {
  add: 'INSERT INTO dot VALUES ( ?, ?, ?, ?, ?, ?)',
  queryByIntvType: 'SELECT * FROM dot WHERE intvType = ?',
  queryAll: 'SELECT * FROM dot',
  queryByIdAndIntvType: 'SELECT * FROM dot WHERE apiID = ? AND intvType = ?',
  queryLatest: 'SELECT * FROM dot ORDER BY `key` DESC LIMIT 1',
  queryLatestByIntvType: 'SELECT * FROM dot WHERE intvType = ? ORDER BY `key` DESC LIMIT 1',
  queryEquityByIdIntvType: 'SELECT equity FROM dot WHERE apiID = ? AND intvType = ?',
  queryTimeByIdIntvType: 'SELECT time FROM dot WHERE apiID = ? AND intvType = ?',
  queryPRByIdIntvType: 'SELECT profitRatio FROM dot WHERE apiID = ? AND intvType = ?'
}