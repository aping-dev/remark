import React from 'react'

import API from '../api'
import RemarkList from './RemarkList'

class Remark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
      content: '',  
      remarkList: [],
    }

    this.createRemarkClick = this.createRemarkClick.bind(this)
    this.updateNickname = this.updateNickname.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.listRemark = this.listRemark.bind(this)
  }

  async componentDidMount() {
    await this.listRemark(this.props.articleId)
  }

  async createRemarkClick(e) {
    try {
      if (this.state.nickname == '') {
        alert('昵称不能为空！')
        return
      }
      if (this.state.content === '') {
        alert('评论不能为空！')
        return
      }
      
      await API('CreateRemark', {'articleId': this.props.articleId, 'ancestorId': -1, 'nickname': this.state.nickname, 'content': this.state.content})
      await this.listRemark(this.props.articleId)
    } catch(err) { console.error(err) }
  }

  async listRemark(articleId) {
    try {
      const result = await API('ListRemarkByArticle', {'articleId': articleId})

      if (!result.data.remarkList || !result.data.remarkList.length)
        return

      if (!result.data.replyList || !result.data.replyList.length) {
        this.setState({'remarkList': result.data.remarkList})
        return
      }

      for (var remark of result.data.remarkList) {
        remark.replies = []
        for (var reply of result.data.replyList) {
          if (reply.ancestorId == remark.uuid) {
            remark.replies.push(reply)
          }
        }
      }
      this.setState({'remarkList': result.data.remarkList})
    } catch(err) { console.error(err) }
  }

  updateNickname(e) {
    this.setState({
        nickname: e.target.value
    })
  }

  updateContent(e) {
    this.setState({
        content: e.target.value
    })
  }

  render() {

    return (
    <div style={{"height": "100%"}}>
      <div>
        <h3>评论</h3>
        <div>
        昵称：<input type="text" onChange={this.updateNickname.bind(this)}/>
        </div>
        <div>
        留言：<input type="textarea" onChange={this.updateContent.bind(this)}/>
        </div>
        <div>
        <button onClick={this.createRemarkClick}>确定</button>
        </div>
      </div>

      <div>
        <h3>评论列表</h3>
        <div>
          <RemarkList data={this.state.remarkList} articleId={this.props.articleId} listRemark={this.listRemark}/>
        </div>
      </div>
    </div>

    )
  }
}

export default Remark
