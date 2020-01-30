const BaseCtrl = require('./BaseCtrl')
const { Remark } = require('../objects')

class CreateRemarkCtrl extends BaseCtrl {
  static async run(args, opts, ctx) {
    let remark = new Remark({
      articleId: args.articleId,
      nickname: args.nickname,
      content: args.content,
    })
    await remark.insert()
  }
}

module.exports = CreateRemarkCtrl
