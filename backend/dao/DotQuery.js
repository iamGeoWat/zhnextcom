module.exports = {
  add: 'INSERT INTO dot VALUES ( ?, ?, ?, ?, ?)',
  queryByIntvType: 'SELECT * FROM dot WHERE intvType = ?',
  queryAll: 'SELECT * FROM dot',
  queryByIdAndIntvType: 'SELECT * FROM dot WHERE apiID = ? AND intvType = ?'
}