import styled from '@emotion/styled'
import React from 'react';
import { Button } from 'antd';

interface IProps {
  fetchUserBalance?: (params?: any) => void;
  userBalance: any;
}


export const Account = (props: IProps) => {

  // const { status, balance, creditValue } = this.state;
  const { userBalance } = props;
  const {
    name = '', usageTime = 150, grade = 2, score = 0,
  } = userBalance;
  return (
    <SummaryComponentBox>
      <div>
        你好，
        {name}
      </div>
      <Examine>
        {
          grade === 0 ? (
            <Grade>您的综合评价为 未知</Grade>
          ) : grade === 1 ? (
            <Grade>您的综合评价为 不及格</Grade>
          ) : grade === 2 ? (
            <GradeOk>您的综合评价为 及格</GradeOk>
          ) : grade === 3 ? (
            <GradeOk>您的综合评价为 良好</GradeOk>
          ) : (
            <GradeOk>您的综合评价为 优秀</GradeOk>
          )
        }
      </Examine>
      <UsageTime>
        <div>
          <Text>您已累计完成 </Text>
          <Value>{usageTime}</Value>
          <Text> 次测试</Text>
        </div>
        <Button type="primary" size="small" style={{ fontSize: '10px' }}>继续测试</Button>
      </UsageTime>
      {/* <Score>
        <div>
          <Text>评分</Text>
          <Value>{score}</Value>
        </div>
        <DetailText>详情</DetailText>
      </Score> */}
    </SummaryComponentBox>
  );
}

const SummaryComponentBox = styled.div`
    /* height: 267px; */
    background-color: #ffffff;
    padding: 18px 20px 2px;
    border-radius: 8px;
    box-shadow: 1px 1px 20px 0 rgba(183,183,188,.1);
`

const Examine = styled.div`
  display: flex;
        margin-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
`

const Grade = styled.div`
  font-size: 12px;
            border: 1px solid #d4d4d4;
            border-radius: 9px;
            padding: 0 6px;
            color: #333;
            height: 22px;
            line-height: 20px;
`

const GradeOk = styled.div`
  font-size: 12px;
            border: 1px solid #1890ff;
            border-radius: 9px;
            padding: 0 6px;
            color: #1890ff;
            height: 22px;
            line-height: 20px;
`

const UsageTime = styled.div`
  margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
`
const Text = styled.span`
  font-size: 12px;
            color: #999;
            line-height: 18px;
            margin-bottom: 2px;
`

const Value = styled.span`
  font-size: 22px;
            color: #000;
            line-height: 26px;
`
const Score = styled.div`
   margin-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
`
const DetailText = styled.div`
        cursor: pointer;
            font-size: 12px;
            color: #282c33;

            &:hover {
                text-decoration: underline;
                color: #999;
            }
`

