const uuid = require('uuid/v4')

const { ReplyModel } = require('../models')

class Reply {
  static async quary(articleId) {
    const fetched = await ReplyModel.query()
      .select('uuid', 'articleId', 'ancestorId', 'replyTo', 'nickname', 'createdAt', 'content') // default fields
      .where('articleId', articleId)
      .orderBy('createdAt', 'asc')
    return fetched.map(m => this.model_to_object(m))
  }

  static model_to_object(model) {
    return new Reply(model)
  }

  constructor(args) {
    this.uuid = args.uuid || uuid()
    this.articleId = args.articleId
    this.ancestorId = args.ancestorId
    this.replyTo = args.replyTo
    this.nickname = args.nickname
    this.createdAt = args.createdAt || new Date()
    this.content = args.content
  }

  async insert() {
    let inserted = await ReplyModel.query().insert({
      'uuid': this.uuid,
      'articleId': this.articleId,
      'ancestorId': this.ancestorId,
      'replyTo': this.replyTo,
      'nickname': this.nickname,
      'createdAt': new Date(this.createdAt).toISOString(),
      'content': this.content
    })
    let fetched = await ReplyModel.query().findById(inserted.uuid)
    Object.assign(this, ReplyModel.model_to_object(fetched))
    return this
  }

  // define method for expose to api return
}

module.exports = Reply

