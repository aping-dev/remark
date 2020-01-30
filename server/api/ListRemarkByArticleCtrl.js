const BaseCtrl = require('./BaseCtrl')
const { Remark, Reply } = require('../objects')

class ListRemarkByArticleCtrl extends BaseCtrl {
  static async run(args, opts, ctx) {
    let remarkList = await Remark.quary(args.articleId)
    let replyList = await Reply.quary(args.articleId)
    return {'remarkList': remarkList, 'replyList': replyList}
  }
}

module.exports = ListRemarkByArticleCtrl
