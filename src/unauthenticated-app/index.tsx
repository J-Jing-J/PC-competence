import { Button, Card, Divider, Typography } from "antd"
import { useState } from "react"
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import leftBackground from '../assets/left-background.svg'
import rightBackground from '../assets/right-background.svg'
import loginLogo from '../assets/login-logo.svg'
import { useDocumentTitle } from "../utils"



export const UnauthenticatedApp = () => {
  // 是否是注册页面，默认是登陆页面，用于切换页面
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null)
  useDocumentTitle('请登录或注册以继续', false)

  return <Container style={{ display: 'flex', justifyContent: 'center' }}>
    {/* <Helmet><title>请登录或注册以继续</title></Helmet> */}
    <Header />
    <Background />
    <ShadowCard>
      <Title>胜任力系统</Title>
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <Tip>{isRegister ? '请注册' : '请登录'}</Tip>
      {
        isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
      }
      <Divider />
      <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '已经有账号了？直接登陆' : '没有账号？注册新账号'}
      </Button>
    </ShadowCard>
  </Container>
}

// 登录按钮(通用)
export const LongButton = styled(Button)`
  width: 100%;
`

// 整个容器
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

// 登录卡片
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center;
`

// 头部logo
const Header = styled.header`
  background: url(${loginLogo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

// 背景图片
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover ;
  background-image: url(${leftBackground}), url(${rightBackground});
`

// 标题
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: #EB4889;
`

// 请注册或请登录
const Tip = styled.h3`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

