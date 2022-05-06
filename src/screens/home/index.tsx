import { useAuth } from "../../context/auth-context"
import styled from '@emotion/styled'
import { Button, DatePicker } from "antd"
import { QuestionnaireListScreen } from "../../screens/questionnaire-list"
import { DataTrendIndex } from '../../components/DataTrendIndex';


export const Home = () => {
  const { user, logout } = useAuth()
  return <Container>
    <Main>
      <ContentBox>
        <LeftContent>
          <ChartArea>
            <HeaderBox>
              <ChartTitle>数据趋势</ChartTitle>
              <ChartSelectArea>
                Select
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
            {/* <Account /> */}
            Account
          </AccountArea>
          <IndexBannerArea>
            {/* <IndexBanner /> */}
            IndexBanner
          </IndexBannerArea>
          <ProductNewsArea>
            {/* <ProductNews /> */}
            ProductNews
          </ProductNewsArea>
          <RightFooterArea>
            <RightFooterTitle>品牌推广</RightFooterTitle>
            <RightFooterBtns>
              <RightFooterLabel>热门产品：</RightFooterLabel>
              <Button size="small" style={{ marginRight: 10 }}>品牌专区</Button>
              <Button size="small">巨屏广告</Button>
            </RightFooterBtns>
          </RightFooterArea>
          {/* <RightBottomImg> */}
          <img src="assets/imgs/right-bg.png" alt="" style={{ width: '100%', height: '150px' }} />
          {/* </RightBottomImg> */}
        </RightContent>
      </ContentBox>
      <SettingBtn>
        {/* <SettingOutlined
          style={{ fontSize: 36, color: '#326fff' }}
          onClick={this.hanleContextChange}
        /> */}
        SettingOutlined
      </SettingBtn>
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
const Footer = styled.footer`grid-area: footer;`

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
  height: 267px;
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
        padding: 18px 20px 64px 20px;
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
const SettingBtn = styled.div` 
width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 5px;
    position: fixed;
    right: 20px;
    top: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`