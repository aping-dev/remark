import React from 'react'
import Router from 'next/router'

// 重定向index页面到评论页
export default class Index extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: '/remark'
      })
      res.end()
    } else {
      Router.push('/remark')
    }
    return {}
  }
}
