import { useAuth } from "./context/auth-context"
import styled from '@emotion/styled'
import { QuestionnaireListScreen } from "./screens/questionnaire-list"
import { Row } from "./components/lib"

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth()
  return <Container>
    {/* {
      user?.identity === 1 ? '我是管理员' : '我是普通用户'
    } */}
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h3>Logo</h3>
        <h3>首页</h3>
        <h3>数据中心</h3>
        <h3>问卷中心</h3>
        <h3>测试与训练中心</h3>
        <h3>激光枪</h3>
      </HeaderLeft>
      <HeaderRight> 
        <button onClick={logout}>登出</button>
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
`
const HeaderItem = styled.h3` 
  margin-right: 3rem;
`

export const HeaderLeft = styled(Row)``;

export const HeaderRight = styled.div`
  
`
const Main = styled.main`grid-area: main;`
const Aside = styled.aside`grid-area: aside;`
const Footer = styled.footer`grid-area: footer;`