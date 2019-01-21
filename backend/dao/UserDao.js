const dbConnection = require('./dbConnection')
const query = require('./UserQuery')

module.exports = class UserDao {
  async addUser (userInfo) {
    let conn = await dbConnection()
    try {
      await conn.query(query.add, [userInfo[0], userInfo[1], userInfo[2], userInfo[3], userInfo[4], userInfo[5], userInfo[6], userInfo[7], null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryUser () {
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
  async queryUserByType (userType) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryByType, userType)
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
  async queryPasswordByUsername (username) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryPasswordByUsername, username)
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
  async queryUsername () {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryUsername)
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