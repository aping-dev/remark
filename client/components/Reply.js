import React from 'react'
import API from '../api'

class Reply extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        nickname: '',
        content: '', 
      }
  
    this.updateContent = this.updateContent.bind(this)
    this.updateNickname = this.updateNickname.bind(this)
    this.listRemark = this.listRemark.bind(this)
    this.closeReply = this.closeReply.bind(this)
    this.replyClick = this.replyClick.bind(this)
    }

    updateNickname (e) {
        this.setState({nickname: e.target.value})
    }

    updateContent (e) {
        this.setState({content: e.target.value})
    }

    listRemark(articleId) {
        return this.props.listRemark(articleId)
    }

    async closeReply() {
        return this.props.closeReply()
    }

    async replyClick() {
        try {
            if (this.state.nickname == '') {
                alert('昵称不能为空！')
                return
            }
            if (this.state.content === '') {
                alert('回复不能为空！')
                return
            }

            await API('Reply', {'articleId': this.props.articleId, 'ancestorId': this.props.ancestorId, 'replyTo': this.props.replyTo, 
                                'nickname': this.state.nickname, 'content': this.state.content})
            await this.closeReply()
            await this.listRemark(this.props.articleId)
        } catch(err) { console.error(err) }
    }

    render() {
        return (
            <div style={{"display": this.props.isShown ? "block" : "none"}}>
                <p>@{this.props.replyTo}</p>
                昵称：<input type="text" onChange={this.updateNickname.bind(this)}/>
                回复：<input type="textarea" onChange={this.updateContent.bind(this)}/>
                <div>
                    <button onClick={this.replyClick}>确定</button>
                </div>
            </div>
        )
    }
}

export default Reply