module.exports = {
  queryAll: 'SELECT * FROM writecount',
  queryCountByUID: 'SELECT wc FROM writecount WHERE UID = ?',
  updateWriteCountByUID: 'UPDATE writecount SET wc = ? WHERE UID = ?'
}