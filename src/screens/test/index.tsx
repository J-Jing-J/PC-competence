import React, { useState } from 'react'
import {
  Form,
  Button,
} from 'antd';
import { useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import { useQuestionnaireInUrl } from './util';
import { TestItem } from './test-item';
import styled from '@emotion/styled';
import { SubmitButton } from '../../components/Buttons';
import { ScreenContainer } from '../../components/lib';


export const TestQuestionnaireScreen = () => {

  // const { data: currentQuestionnaire } = useQuestionnaireInUrl()
  const currentQuestionnaire = {
    "id": 0,
    "title": "问卷1",
    "discription": "问卷说明",
    "typeId": 1,
    "fullScore": 150,
    "value": 0,  //0代表未选择，1代表A，以此类推
    "rank": "名次--暂无",
    "creater": "创建人",
    "createTime": "1546900800000",
    "logo": "logo",
    "pin": true
  }

  const { data: tests } = useQuestionnaireTest()

  useDocumentTitle(currentQuestionnaire?.title);

  const [value, setValue] = useState(currentQuestionnaire.value);

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   // this.setState({
  //   //   value: e.target.value,
  //   // });
  // };

  return (
    <ScreenContainer>
      <QuestionnaireContainer>
        <QuestionnaireTitle>{currentQuestionnaire?.title}</QuestionnaireTitle>
        <QuestionnaireDescription>{currentQuestionnaire?.discription}</QuestionnaireDescription>
        {
          <TestForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize as SizeType}
          >
            <TestItem />
            {/* <Form.Item> */}
            <SubmitButton style={{ marginBottom: '20px' }} size="large">提交</SubmitButton>
            {/* </Form.Item> */}
          </TestForm>
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
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  overflow: scroll;
`

const QuestionnaireTitle = styled.h1`
  width: 70%;
  text-align: center;
`
const QuestionnaireDescription = styled.p`
  color: gray;
  text-align: center;
`
const TestForm = styled(Form)`
  width: 70%;
  margin-bottom: 50px;
  padding-bottom: 50px;
`
