import React, { useState } from 'react'
import { Rate } from 'antd'
import { useForm } from "antd/es/form/Form"
import { useDocumentTitle } from '../../utils'
import { ScreenContainer } from '../../components/lib';
import { ReactComponent as TestFinish } from '../../assets/test-finish.svg'
import styled from '@emotion/styled';



export const TestFinishScreen = () => {

  const [form] = useForm();



  // const { data: currentQuestionnaire } = useQuestionnaireInUrl()
  const currentQuestionnaire = {
    "id": 0,
    "title": "问卷1",
    "description": "问卷说明",
    "typeId": 1,
    "fullScore": 150,
    "value": 0,  //0代表未选择，1代表A，以此类推
    "rank": "名次--暂无",
    "creater": "创建人",
    "createTime": "1546900800000",
    "logo": "logo",
    "pin": true
  }

  const testRateOptions = ['terrible', 'bad', 'normal', 'good', 'wonderful'];



  useDocumentTitle(currentQuestionnaire?.title ? currentQuestionnaire?.title : '问卷完成');

  return (
    <ScreenContainer>
      <TestFinishContainer>
        <FinishImg>
          <TestFinish height={'20rem'} width={'20rem'} />
        </FinishImg>
        <FinishTest>问卷到此结束，感谢您的参与</FinishTest>
      </TestFinishContainer>
    </ScreenContainer>
  )
}

const TestFinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FinishImg = styled.div`
  margin-top: 7rem;
`

const FinishTest = styled.p`
  margin-top: 4rem;
  font-size: 3rem;
`

