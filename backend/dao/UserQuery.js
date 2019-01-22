module.exports = {
  add: 'INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  queryByType: 'SELECT * FROM user WHERE type = ?',
  queryAll: 'SELECT * FROM user',
  queryUsername: 'SELECT username FROM user',
  queryPasswordByUsername: 'SELECT password FROM user WHERE username = ?',
  queryByUsername: 'SELECT * FROM user WHERE username = ?',
  queryByUserID: 'SELECT * FROM user WHERE UID = ?'
}