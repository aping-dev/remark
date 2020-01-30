const BaseModel = require('./BaseModel')

class RemarkModel extends BaseModel {
  static get tableName() {
    return 'remark'
  }

  static get idColumn() {
    return 'uuid'
  }
}

module.exports = RemarkModel

