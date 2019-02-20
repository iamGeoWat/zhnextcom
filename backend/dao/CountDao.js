const dbConnection = require('./dbConnection')
const query = require('./CountQuery')

module.exports = class CommentDao {
  async queryAll () {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryAll)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryWriteCountByUID (UID) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryCountByUID, UID)
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async updateWriteCountByUID (writecount, UID) {
    let conn = await dbConnection()
    try {
      await conn.query(query.updateWriteCountByUID, [writecount, UID])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
}