import React, { useState } from 'react'
import {
  Form,
  Button
} from 'antd';
import { useForm } from "antd/es/form/Form"
import { resetRoute, useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import { TestItem } from './test-item';
import styled from '@emotion/styled';
import { SubmitButton } from '../../components/lib';
import { ScreenContainer } from '../../components/lib';
import { CreateTest } from './create-test';

interface TestEditColumnProps {
  addType: number
}

export const TestEditColumn = (props: TestEditColumnProps) => {

  const { addType } = props;

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



  return (
    <ScreenContainer>
      <QuestionnaireContainer>
        <QuestionnaireTitle>{currentQuestionnaire?.title}</QuestionnaireTitle>
        <QuestionnaireDescription>{currentQuestionnaire?.description}</QuestionnaireDescription>
        <TestItem />
        {
          addType < 10 ? <CreateTest addType={addType} /> : null
        }
      </QuestionnaireContainer>
    </ScreenContainer>
  )
}

const QuestionnaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  align-items: center;
  min-width: 75rem;
  border-radius:20px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  margin-top: 2rem;
`

export const QuestionnaireTitle = styled.h1`
  width: 70%;
  text-align: center;
  margin-top: 30px;
  font-size: 3rem;
`

export const QuestionnaireDescription = styled.p`
  text-align: left;
  width: 100%;
  padding-left: 12rem;
`
