const uuid = require('uuid/v4')

const { RemarkModel } = require('../models')

class Remark {
  static async quary(articleId) {
    const fetched = await RemarkModel.query()
      .select('uuid', 'articleId', 'nickname', 'createdAt', 'content') // default fields
      .where('articleId', articleId)
      .orderBy('createdAt', 'asc')
    return fetched.map(m => this.model_to_object(m))
  }

  static model_to_object(model) {
    return new Remark(model)
  }

  constructor(args) {
    this.uuid = args.uuid || uuid()
    this.articleId = args.articleId
    this.nickname = args.nickname
    this.createdAt = args.createdAt || new Date()
    this.content = args.content
  }

  async insert() {
    let inserted = await RemarkModel.query().insert({
      'uuid': this.uuid,
      'articleId': this.articleId,
      'nickname': this.nickname,
      'createdAt': new Date(this.createdAt).toISOString(),
      'content': this.content
    })
    let fetched = await RemarkModel.query().findById(inserted.uuid)
    Object.assign(this, Remark.model_to_object(fetched))
    return this
  }

  // define method for expose to api return
}

module.exports = Remark

