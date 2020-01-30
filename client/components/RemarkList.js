import React from 'react'
import Reply from './Reply'
import timeFormat from '../utils/timeFormat'

class RemarkListElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
      content: '',  
      isShownReply: false,
      isShownReply2: false,
    }

    this.showReply = this.showReply.bind(this)
    this.closeReply = this.closeReply.bind(this)
    this.showReply2 = this.showReply2.bind(this)
    this.closeReply2 = this.closeReply2.bind(this)
    this.listRemark = this.listRemark.bind(this)
  }

  async showReply() {
    this.setState({isShownReply: true})
  }

  async closeReply() {
    this.setState({isShownReply: false})
  }

  async showReply2() {
    this.setState({isShownReply2: true})
  }

  async closeReply2() {
    this.setState({isShownReply2: false})
  }

  async listRemark(articleId) {
    return this.props.listRemark(articleId)
  }

  render() {
    return (
    <div style={{"height": "100%"}}>
      <div>
        <p>{this.props.nickname} {timeFormat.toLocalTime(this.props.createdAt)}</p>
        <p>{this.props.content}</p>
      </div>
      <div><button onClick={this.showReply}>回复</button></div>
      <Reply isShown={this.state.isShownReply} articleId={this.props.articleId} ancestorId={this.props.uuid} replyTo={this.props.nickname} 
            closeReply={this.closeReply} listRemark={this.listRemark}/>

      <div>
        {this.props.replies && this.props.replies.length && (
          <div style={{"margin-left": "15px"}}>
            {this.props.replies.map(reply => (
              <div>
                <div>
                  <p>{reply.nickname} @{reply.replyTo} {timeFormat.toLocalTime(reply.createdAt)}</p>
                  <p>{reply.content}</p>
                </div>
                <div><button onClick={this.showReply2}>回复</button></div>
                <Reply isShown={this.state.isShownReply2} articleId={reply.articleId} ancestorId={this.props.uuid} replyTo={reply.nickname} 
                      closeReply={this.closeReply2} listRemark={this.listRemark}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
  }
}

class RemarkList extends React.Component {
  constructor(props) {
    super(props)

    this.listRemark = this.listRemark.bind(this)
  }

  async listRemark(articleId) {
    return this.props.listRemark(articleId)
  }

  render() {
    let items = []
    if (!this.props.data) return
    for (const [i, v] of this.props.data.entries()) {
        let item = <RemarkListElement
          uuid={v.uuid}
          nickname={v.nickname}
          createdAt={v.createdAt}
          content={v.content}
          replies={v.replies || null}
          articleId={this.props.articleId}
          listRemark={this.listRemark}
        />
        items.push(item)
    }
  
    return (
    <div style={{"height": "100%"}}>
      <ul>
        {items}
      </ul>
    </div>
    )
  }
}

export default RemarkList
