const BaseModel = require('./BaseModel')

class ReplyModel extends BaseModel {
  static get tableName() {
    return 'reply'
  }

  static get idColumn() {
    return 'uuid'
  }
}

module.exports = ReplyModel

