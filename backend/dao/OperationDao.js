const dbConnection = require('./dbConnection')
const query = require('./OperationQuery')

module.exports = class OperationDao {
  async addOperation (operationInfo) {
    let conn = await dbConnection()
    try {
      await conn.query(query.add, [operationInfo[0], operationInfo[1], operationInfo[2], operationInfo[3], operationInfo[4], null])
      return true
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await conn.release()
      await conn.destroy()
    }
  }
  async queryOperationByAPI (apiID) {
    let conn = await dbConnection()
    try {
      let result = await conn.query(query.queryByAPI, apiID)
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