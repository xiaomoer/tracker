import React from 'react'

class ErroryBoundary extends React.Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    // 设置 {error: true}来实现 UI降级
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 上报服务器等一系列动作
  }

  render() {
    const { hasError } = this.state
    return hasError ? <p>发生了错误...</p> : this.props.children
  }
}

export default ErroryBoundary
