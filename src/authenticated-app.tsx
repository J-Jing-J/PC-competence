import { useAuth } from "./context/auth-context"
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from "antd"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { QuestionnaireListScreen } from "./screens/questionnaire-list"
import { ButtonNoPadding, Row } from "./components/lib"
// 用svg的方式，而不是img的方式渲染图片
import { ReactComponent as LoginLogo } from './assets/login-logo.svg'
import { QuestionaireScreen } from "./screens/questionnaire"
import { resetRoute } from "./utils"
import { useState } from "react"
import { QuestionnaireModal } from "./screens/questionnaire-list/questionnaire-modal"
import { QuestionnairePopover } from "./components/questionnaire-popover"

export const AuthenticatedApp = () => {
  const [questionnaireModalOpen, setQuestionnaireModalOpen] = useState(false)
  // const value: any = undefined
  return <Container>
    {/* {value.exist} */}

    <PageHeader setQuestionnaireModalOpen={setQuestionnaireModalOpen} />
    <Main>
      {/* <QuestionnaireListScreen /> */}
      {/* BrowserRouter用于组件间共享信息，可以用reacthook获取 */}
      <Router>
        {/* react-router6里，所有的router都要被包裹在Routes里面 */}
        <Routes>
          {/* /questionnaires */}
          <Route path={'/questionnaires'} element={<QuestionnaireListScreen setQuestionnaireModalOpen={setQuestionnaireModalOpen} />}></Route>
          <Route path={'/questionnaires/:questionnaireId/*'} element={<QuestionaireScreen />}></Route>
          <Route path="*" element={<Navigate to="/questionnaires" replace={true} />} />
        </Routes>
      </Router>
    </Main>
    <Aside>aside</Aside>
    <Footer>footer</Footer>
    <QuestionnaireModal questionnaireModalOpen={questionnaireModalOpen} onClose={() => setQuestionnaireModalOpen(false)} />
  </Container>
}

const PageHeader = (props: { setQuestionnaireModalOpen: (isOpen: boolean) => void }) => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type={'link'} onClick={resetRoute}>
        {/* 用svg的方式，而不是img的方式渲染图片 */}
        <LoginLogo style={{ margin: -10, }} height={'5rem'} width={'5rem'} color={'rgb(38, 132, 255)'} />
        {/* <img src={LoginLogo} /> */}
      </ButtonNoPadding>
      <h3 style={{ fontWeight: 'bold' }}>胜任力系统</h3>
      <span>首页</span>
      {/* <h3>心理量表</h3>*/}
      <QuestionnairePopover setQuestionnaireModalOpen={props.setQuestionnaireModalOpen} />
      <span>数据中心</span>
      <span>激光枪</span>
      <span>测试与训练中心</span>
    </HeaderLeft>
    <HeaderRight>
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { user, logout } = useAuth()
  return <Dropdown
    overlay={
      <Menu>
        {
          user?.identity === 1 ? '管理员' : '普通用户'
        }
        <Menu.Item key={'logout'}>
          {/* <a onClick={logout}>登出</a> 用a标签建议跳转时才使用：href */}
          <Button type={"link"} onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
    <Button type={"link"} onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
  </Dropdown>
}

// 整个容器
const Container = styled.div`
  display: grid; 
  grid-template-rows: 6rem 1fr 6rem;  //从上到下的大小 1fr表示自动
  grid-template-columns: 20rem 1fr 20rem;  //从左到右的大小 1fr表示自动
  grid-template-areas: 
  "header header header"  
  "main main aside"
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
`
const HeaderItem = styled.h3` 
  margin-right: 3rem;
`

export const HeaderLeft = styled(Row)``;

export const HeaderRight = styled.div`
  
`
const Main = styled.main`grid-area: main;`
const Aside = styled.aside`grid-area: aside;`
const Footer = styled.footer`
grid-area: footer;
padding: 3.2rem;
`
