import styled from '@emotion/styled';
import { Carousel } from 'antd';
import {
  newsData1, newsData2, newsData3, newsData4,
} from '../../../common/constants/news';

interface IProps { }

export const News = (props: IProps) => {
  return (
    <NewsComponentBox>
      <MyCarousel>
        <NewsList>
          {
            newsData1.map((newsItem: any, index: number) => (
              <NewsItem key={`news-item-${index.toString()}`}>
                <Title>{newsItem.title}</Title>
                <OtherInfo>
                  <Source>{newsItem.source}</Source>
                  <Time>{newsItem.time}</Time>
                </OtherInfo>
              </NewsItem>
            ))
          }
        </NewsList>
        <NewsList>
          {
            newsData2.map((newsItem: any, index: number) => (
              <NewsItem key={`news-item-${index.toString()}`}>
                <Title>{newsItem.title}</Title>
                <OtherInfo>
                  <Source>{newsItem.source}</Source>
                  <Time>{newsItem.time}</Time>
                </OtherInfo>
              </NewsItem>
            ))
          }
        </NewsList>
        <NewsList>
          {
            newsData3.map((newsItem: any, index: number) => (
              <NewsItem key={`news-item-${index.toString()}`}>
                <Title>{newsItem.title}</Title>
                <OtherInfo>
                  <Source>{newsItem.source}</Source>
                  <Time>{newsItem.time}</Time>
                </OtherInfo>
              </NewsItem>
            ))
          }
        </NewsList>
        <NewsList>
          {
            newsData4.map((newsItem: any, index: number) => (
              <NewsItem key={`news-item-${index.toString()}`}>
                <Title>{newsItem.title}</Title>
                <OtherInfo>
                  <Source>{newsItem.source}</Source>
                  <Time>{newsItem.time}</Time>
                </OtherInfo>
              </NewsItem>
            ))
          }
        </NewsList>
      </MyCarousel>
    </NewsComponentBox>
  );
}

const NewsComponentBox = styled.div`
    /* padding: 18px 20px 18px 20px; */
    border-radius: 8px;
    background-color: #ffffff;
`

const NewsList = styled.div`
  background: #f0efef;
  padding: 18px 20px 10px 20px;
`

const NewsItem = styled.div`
  font-size: 14px;
            color: #333;
            padding-right: 12px;
            margin-bottom: 16px;
`

const Title = styled.div`
  overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
`
const OtherInfo = styled.div`
  display: flex;
                align-items: center;
                justify-content: space-between;
`
const Source = styled.div`
  font-size: 12px;
                    color: #999;
`
const Time = styled.div`
  font-size: 12px;
                    color: #999;
`
const MyCarousel = styled(Carousel)`
.slick-dots {
            bottom: -10px;
            li {
                background: #d8d8d8;
            }
            .slick-active {
                button {
                    background: #12ADA9;
                }
            }
        }
`