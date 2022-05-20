import React, { useState } from 'react'
import {
  Form,
  Button,
  BackTop
} from 'antd';
import { useForm } from "antd/es/form/Form"
import { resetRoute, useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import { useQuestionnaireIdInUrl, useQuestionnaireInUrl } from './util';
import { TestItem } from './test-item';
import styled from '@emotion/styled';
import { BackTopDiv, SubmitButton } from '../../components/lib';
import { ScreenContainer } from '../../components/lib';


export const TestQuestionnaireScreen = () => {

  const [form] = useForm();



  const { data: currentQuestionnaire } = useQuestionnaireInUrl();

  // const currentQuestionnaire = {
  //   "id": 0,
  //   "title": "问卷1",
  //   "description": "问卷说明",
  //   "typeId": 1,
  //   "fullScore": 150,
  //   "value": 0,  //0代表未选择，1代表A，以此类推
  //   "rank": "名次--暂无",
  //   "creater": "创建人",
  //   "createTime": "1546900800000",
  //   "logo": "logo",
  //   "pin": true
  // }



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
        <QuestionnaireDescription>{currentQuestionnaire?.description}</QuestionnaireDescription>
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
      <BackTop>
        <BackTopDiv>UP</BackTopDiv>
      </BackTop>
    </ScreenContainer>
  )
}

const QuestionnaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  align-items: center;
  max-width: 100%;
  border-radius:20px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  /* margin-right: 1.5rem; */
`

export const QuestionnaireTitle = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`
export const QuestionnaireDescription = styled.p`
  margin-left: 35rem;
  text-align: left;
  width: 100%;
`
const TestForm = styled(Form)`
  width: 100%;
  margin-bottom: 50px;
  padding-bottom: 50px;
`
