import { useAuth } from "./context/auth-context"
import styled from '@emotion/styled'
import { QuestionnaireListScreen } from "./screens/questionnaire-list"
import { Row } from "./components/lib"
// 用svg的方式，而不是img的方式渲染图片
import { ReactComponent as LoginLogo } from './assets/login-logo.svg'
import { Button, Dropdown, Menu } from "antd"

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth()
  // const value: any = undefined
  return <Container>
    {/* {value.exist} */}
    {/* {
      user?.identity === 1 ? '我是管理员' : '我是普通用户'
    } */}
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* 用svg的方式，而不是img的方式渲染图片 */}
        <LoginLogo width={'5rem'} color={'rgb(38, 132, 255)'} />
        {/* <img src={LoginLogo} /> */}
        <h3 style={{ fontWeight: 'bold' }}>胜任力系统</h3>
        <h3>首页</h3>
        <h3>数据中心</h3>
        <h3>问卷中心</h3>
        <h3>测试与训练中心</h3>
        <h3>激光枪</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                {/* <a onClick={logout}>登出</a> 用a标签建议跳转时才使用：href */}
                <Button type={"link"} onClick={logout}>登出</Button>
              </Menu.Item>
            </Menu>}>
          <Button type={"link"} onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
    <Main>
      <QuestionnaireListScreen />
    </Main>
    <Aside>aside</Aside>
    <Footer>footer</Footer>
  </Container>
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