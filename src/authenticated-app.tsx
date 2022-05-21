import { useAuth } from "./context/auth-context"
import styled from '@emotion/styled'
import { Button, Dropdown, Menu, Tag } from "antd"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { QuestionnaireListScreen } from "./screens/questionnaire-list"
import { Home } from './screens/home'
import { ButtonNoPadding, Row } from "./components/lib"
// 用svg的方式，而不是img的方式渲染图片
import { ReactComponent as LoginLogo } from './assets/login-logo.svg'
import { QuestionaireScreen } from "./screens/questionnaire"
import { resetRoute } from "./utils"
import { useState } from "react"
import { QuestionnaireModal } from "./screens/questionnaire-list/questionnaire-modal"
import { QuestionnairePopover } from "./components/questionnaire-popover"
import { AccountScreen } from "./screens/user"
import { AdminScreen } from "./screens/admin"

//eslint-disable-next-line
export default () => {
  const { user } = useAuth();
  return <Container>
    <Router>
      <PageHeader />
      <Main>
        {/* <QuestionnaireListScreen /> */}
        {/* BrowserRouter用于组件间共享信息，可以用reacthook获取 */}
        {/* react-router6里，所有的router都要被包裹在Routes里面 */}
        <Routes>
          <Route path={'/home'} element={<Home />}></Route>
          <Route path={'/questionnaires'} element={<QuestionnaireListScreen />}></Route>
          <Route path={'/questionnaires/:questionnaireId/*'} element={<QuestionaireScreen />}></Route>
          <Route path={'/account/*'} element={<AccountScreen />}></Route>
          <Route path={'/admin/*'} element={<AdminScreen />}></Route>
          {
            // 如果是管理员，直接跳转到管理界面
            user?.authorityId === 1 || user?.authorityId === 2 ? (
              <Route path="*" element={<Navigate to="/admin" replace={true} />} />
            ) : (
              <Route path="*" element={<Navigate to="/home" replace={true} />} />
            )
          }
        </Routes>
        {/* {
          user?.authorityId === 1 || user?.authorityId === 2 ? (
            <Routes>
              <Route path="*" element={<Navigate to="/admin" replace={true} />} />
              <Route path={'/admin'} element={<AdminScreen />}></Route>
              <Route path={'/admin/*'} element={<AdminScreen />}></Route>
              <Route path="*" element={<Navigate to="/admin" replace={true} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={'/home'} element={<Home />}></Route>
              <Route path={'/questionnaires'} element={<QuestionnaireListScreen />}></Route>
              <Route path={'/questionnaires/:questionnaireId/*'} element={<QuestionaireScreen />}></Route>
              <Route path={'/account/*'} element={<AccountScreen />}></Route>
              <Route path="*" element={<Navigate to="/home" replace={true} />} />
            </Routes>
          )
        } */}

      </Main>
      {/* <Aside>aside</Aside> */}
      {/* <Footer>footer123</Footer> */}
      <QuestionnaireModal
      // questionnaireModalOpen={questionnaireModalOpen}
      // onClose={() => setQuestionnaireModalOpen(false)}
      />
    </Router>
  </Container>
}

const PageHeader = () => {
  const { user } = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type={'link'} onClick={resetRoute}>
        {/* 用svg的方式，而不是img的方式渲染图片 */}
        <LoginLogo style={{ margin: -10, }} height={'5rem'} width={'5rem'} color={'rgb(38, 132, 255)'} />
        {/* <img src={LoginLogo} /> */}
      </ButtonNoPadding>
      {
        user?.authorityId === 1 || user?.authorityId === 2 ? (
          <h3 style={{ fontWeight: 'bold' }} onClick={resetRoute}>胜任力系统管理员端</h3>
        ) : (
          <>
            <h3 style={{ fontWeight: 'bold' }} onClick={resetRoute}>胜任力系统</h3>
            <ButtonNoPadding type={'link'} color="black" onClick={resetRoute}>
              <span>首页</span>
            </ButtonNoPadding>
            <ButtonNoPadding type={'link'} color="black" onClick={() => window.location.href = '/questionnaires'}>
              <QuestionnairePopover />
            </ButtonNoPadding>
          </>
        )
      }
      {/* <span>数据中心</span>
      <span>激光枪</span>
      <span>测试与训练中心</span> */}
    </HeaderLeft>
    <HeaderRight>
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { user, logout } = useAuth();
  // const toUser = () => window.location.pathname = user?.authorityId === 1 || user?.authorityId === 2 ? 'admin' : 'account'
  const toUser = () => window.location.pathname = 'account'

  return <Dropdown
    overlay={
      <Menu>
        {
          user?.authorityId === 1 ? (
            <Tag>超级管理员</Tag>
          ) : user?.authorityId === 2 ? (
            <Tag>普通管理员</Tag>
          ) : (<Tag>普通用户</Tag>)
        }
        <Menu.Item key={'logout'}>
          {/* <a onClick={logout}>登出</a> 用a标签建议跳转时才使用：href */}
          <Button type={"link"} onClick={logout}>登出</Button>
        </Menu.Item>
        <Menu.Item key={'user'}>
          {/* <a onClick={logout}>登出</a> 用a标签建议跳转时才使用：href */}
          <Button type={"link"} onClick={toUser}>用户中心</Button>
        </Menu.Item>
      </Menu>}>
    <Button type={"link"} onClick={e => e.preventDefault()}>Hi,{user?.userName}</Button>
  </Dropdown>
}

// 整个容器12qqqqqqqq 
const Container = styled.div`
  display: grid; 
  grid-template-rows: 6rem 1fr 6rem;  //从上到下的大小 1fr表示自动
  grid-template-columns: 20rem 1fr 20rem;  //从左到右的大小 1fr表示自动
  grid-template-areas: 
  "header header header"  
  /* "main main aside" */
  "main main main"
  "footer footer footer";
  height: 100vh;
  grid-gap: 1rem;  //每一块的间距
`
// 整个布局，用grid-template-rows: 6rem calc(100vh - 6rem);代替
// const PageHeader = styled.header`
//   height: 6rem;
// `
// const Main = styled.main`
//   height: calc(100vh - 6rem);  //整个视口-PageHeader
// `

export const Header = styled(Row)`
  grid-area: header;  //别名
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: fixed;
  background-color: rgb(244, 245, 247);
  width: 100%;
  max-height: 3rem;
`
const HeaderItem = styled.h3` 
  margin-right: 3rem;
`

export const HeaderLeft = styled(Row)``;
export const HeaderRight = styled.div``
const Main = styled.main`grid-area: main;`
const Aside = styled.aside`grid-area: aside;`
const Footer = styled.footer`
grid-area: footer;
padding: 3.2rem;
`
