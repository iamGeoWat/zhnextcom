module.exports = {
  add: 'INSERT INTO comment VALUES ( ?, ?, ?, ?)',
  queryByName: 'SELECT * FROM comment WHERE name = ?',
  queryAll: 'SELECT * FROM comment'
}