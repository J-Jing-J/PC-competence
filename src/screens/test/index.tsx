import React, { useState } from 'react'
import {
  Form,
  Button
} from 'antd';
import { useForm } from "antd/es/form/Form"
import { resetRoute, useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import { useQuestionnaireInUrl } from './util';
import { TestItem } from './test-item';
import styled from '@emotion/styled';
import { SubmitButton } from '../../components/lib';
import { ScreenContainer } from '../../components/lib';


export const TestQuestionnaireScreen = () => {

  const [form] = useForm();



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



  useDocumentTitle(currentQuestionnaire?.title ? currentQuestionnaire?.title : '问卷');

  // 提交的同时清空数据
  const onFinish = (values: any) => {
    // mutateAsync({ ...editingQuestionnaire, ...values }).then(() => {
    //   form.resetFields();
    // })
    console.log(values);
    form.resetFields();
    window.location.replace('finish')
  }

  return (
    <ScreenContainer>
      <QuestionnaireContainer>
        <QuestionnaireTitle>{currentQuestionnaire?.title}</QuestionnaireTitle>
        <QuestionnaireDescription>{currentQuestionnaire?.discription}</QuestionnaireDescription>
        {
          <TestForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout={"vertical"}
            onFinish={onFinish}
            form={form}
          >
            <TestItem />
            <Form.Item style={{ textAlign: 'right', marginTop: '40px' }}>
              <Button
                size="large"
                type={'primary'}
                htmlType={"submit"}
              >提交</Button>
            </Form.Item>
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
  border-radius:20px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

export const QuestionnaireTitle = styled.h1`
  width: 70%;
  text-align: center;
  margin-top: 30px;
`
export const QuestionnaireDescription = styled.p`
  text-align: left;
  width: 70%;
`
const TestForm = styled(Form)`
  width: 70%;
  margin-bottom: 50px;
  padding-bottom: 50px;
`
