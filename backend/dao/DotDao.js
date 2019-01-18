const dbConnection = require('./dbConnection')
const query = require('./DotQuery')

module.exports = class DotDao {
  async addDot (dotInfo) {
    let conn = await dbConnection()
    try {
      await conn.query(query.add, [dotInfo[0], dotInfo[1], dotInfo[2], dotInfo[3], null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryDot () {
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
  async queryDotByIntvType (intvType) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryByIntvType, intvType)
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
  async queryDotByIdAndIntvType (apiID, intvType) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryByIdAndIntvType, [apiID, intvType])
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
  async queryLatest () {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryLatest)
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
  async queryLatestByIntvType (intvType) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryLatestByIntvType, intvType)
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