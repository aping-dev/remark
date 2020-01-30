const BaseCtrl = require('./BaseCtrl')
const { Reply } = require('../objects')

class ReplyCtrl extends BaseCtrl {
  static async run(args, opts, ctx) {
    let reply = new Reply({
      articleId: args.articleId,
      ancestorId: args.ancestorId,
      replyTo: args.replyTo,
      nickname: args.nickname,
      content: args.content,
    })
    await reply.insert() 
  }
}

module.exports = ReplyCtrl
