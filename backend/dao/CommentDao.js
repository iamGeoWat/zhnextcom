const dbConnection = require('./dbConnection')
const query = require('./CommentQuery')

module.exports = class CommentDao {
  async addComment (commentInfo) {
    let conn = await dbConnection()
    try {
      await conn.query(query.add, [commentInfo[0], commentInfo[1], commentInfo[2], null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryComment () {
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
  async queryCommentByName (name) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryByName, name)
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
}