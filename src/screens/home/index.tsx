import { useAuth } from "../../context/auth-context"
import styled from '@emotion/styled'
import { BackTop, Button, DatePicker } from "antd"
import { Footer } from '../../components/Footer';
import { SettingOutlined } from '@ant-design/icons';
import { QuestionnaireListScreen } from "../../screens/questionnaire-list"
import { DataTrendIndex } from '../../components/DataTrendIndex';
import { Account } from "./components/account";
import { Banner } from "./components/banner";
import { News } from "./components/news";
import { useState } from "react";
import { BackTopDiv } from "../../components/lib";


export const Home = () => {
  const { user, logout } = useAuth();
  const userBalance = {
    name: user?.userName,
    usageTime: user?.usageTime,
    status: user?.grade,
    score: user?.score
  };

  const defaultTheme = {
    buttonType: 'primary',
  }
  const [theme, setTheme] = useState(defaultTheme);

  const hanleContextChange = () => {
    const newButtonType = theme.buttonType === 'primary' ? 'defalut' : 'primary';
    setTheme({ buttonType: newButtonType });
  }

  return <Container>
    <Main>
      <ContentBox>
        <LeftContent>
          <ChartArea>
            <HeaderBox>
              <ChartTitle>数据趋势</ChartTitle>
              <ChartSelectArea>
                {/* <Select
                    defaultValue="0"
                    style={{ width: 120 }}
                    // onChange={this.handlePromotionChange}
                    size="small"
                  >
                    <Option value="0">全部推广产品</Option>
                    <Option value="1">搜索推广</Option>
                    <Option value="2">一站式推广</Option>
                    <Option value="3">合约推广</Option>
                    <Option value="4">知识营销</Option>
                  </Select> */}
                <DatePicker
                  // onChange={this.handalDateChange}
                  size="small"
                  style={{ marginLeft: 10 }}
                  placeholder="请选择日期"
                />
              </ChartSelectArea>
            </HeaderBox>
            <DataTrendIndex />
          </ChartArea>
          <PromotionCardArea>
            {/* <PromotionCard history={history} /> */}
            PromotionCard
          </PromotionCardArea>
          <ProductCardArea>
            {/* <ProductCard /> */}
            ProductCard
          </ProductCardArea>
        </LeftContent>
        <RightContent>
          <AccountArea>
            <Account userBalance={userBalance} />
            {/* Account */}
          </AccountArea>
          <IndexBannerArea>
            <Banner />
          </IndexBannerArea>
          <ProductNewsArea>
            <News />
          </ProductNewsArea>
          <RightFooterArea>
            <RightFooterTitle>胜任力APP推广</RightFooterTitle>
            <RightFooterBtns>
              <RightFooterLabel>Label</RightFooterLabel>
              <Button size="small" style={{ marginRight: 10, fontSize: '10px' }}>按钮1</Button>
              <Button size="small" style={{ fontSize: '10px' }}>按钮2</Button>
            </RightFooterBtns>
          </RightFooterArea>
          <RightBottomImg>
            <img src="assets/right-bg.png" alt="" style={{ width: '100%', height: '150px' }} />
          </RightBottomImg>
        </RightContent>
      </ContentBox>
      <FootBox>
        <Footer />
      </FootBox>
      <SettingBtn>
        <SettingOutlined
          style={{ fontSize: 30, color: '#12ADA9' }}
          onClick={hanleContextChange}
        />
      </SettingBtn>
    </Main>
    <BackTop>
      <BackTopDiv>UP</BackTopDiv>
    </BackTop>
  </Container>
}

// 整个容器
const Container = styled.div`
  display: grid; 
  grid-template-rows: 2rem 1fr 6rem;  //从上到下的大小 1fr表示自动
  grid-template-columns: 20rem 1fr 20rem;  //从左到右的大小 1fr表示自动
  grid-template-areas: 
  "header header header"  
  "nav main aside"
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

export const Header = styled.header`
  grid-area: header;  //别名
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
export const HeaderRight = styled.div`
  
`
const Main = styled.main`grid-area: main;`
const Nav = styled.nav`grid-area: nav;`
const Aside = styled.aside`grid-area: aside;`
// const Footer = styled.footer`grid-area: footer;`

const ContentBox = styled.div` 
  width: 100%;
  margin: 0 auto;
  // height: 500px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const LeftContent = styled.div` 
  width: 74%;
  margin-right: 10px;
  box-shadow: 1px 1px 20px 0 rgba(183,183,188,.1);
`
const ChartArea = styled.div` 
  // height: 437px;
`


const HeaderBox = styled.div` 
  height: 32px;
          line-height: 32px;
          display: flex;
          justify-content: space-between;
          // padding-bottom: 10px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-color: #ffffff;
          padding: 18px 20px 30px;
`
const ChartTitle = styled.div` 
  font-size: 21px;
`
const ChartSelectArea = styled.div`
`
const PromotionCardArea = styled.div` 
    margin-top: 22px;
`
const ProductCardArea = styled.div` 
  margin-top: 22px;
`
const RightContent = styled.div` 
  width: 288px;
`
const AccountArea = styled.div` 
  /* height: 267px; */
`
const IndexBannerArea = styled.div` 
  height: 148px;
  margin-top: 20px;
`
const ProductNewsArea = styled.div` 
height: 270px;
        margin-top: 20px;
`
const RightFooterArea = styled.div` 
margin-top: 10px;
        border-top: 1px solid #eee;
        background-color: #ffffff;
        padding: 18px 20px 20px 20px;
        border-radius: 8px;
`
const RightFooterTitle = styled.div` 
font-size: 14px;
          color: #000;
          display: inline-block;
`
const RightFooterBtns = styled.div` 
display: flex;
          align-items: center;
`
const RightFooterLabel = styled.div` 
font-size: 12px;
            margin-right: 5px;
            color: #999;
`
const RightBottomImg = styled.div` 
background-color: #edeef0;
            font-size: 12px;
`

const FootBox = styled.div` 
  width: 100%;
        height: 100px;
        margin-top: 20px;
`

const SettingBtn = styled.div` 
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 5px;
    position: fixed;
    right: 5px;
    top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`