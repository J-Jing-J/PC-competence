import React, { Children, ReactNode } from 'react'

// 可以使用react-error-boundary代替

// 错误边界必须在class组件里定义
// React.Component<P, S> P是props,S是state
// props: Children,fallbackRender
type fallbackRender = (props: { error: Error | null }) => React.ReactElement
// children: ReactNode 用 React.PropsWithChildren带替，传入除了children剩下的属性
export class ErrorBoundary extends React.Component
  <React.PropsWithChildren<{ fallbackRender: fallbackRender }>,
  { error: Error | null }>
{
  state = { error: null }

  // ErrorBoundary的子组件发生错误时接收错误并调用
  // error值赋给state
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }

}