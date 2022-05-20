import React, { useState } from 'react'
import {
  Form,
  Button,
  BackTop
} from 'antd';
import { useForm } from "antd/es/form/Form"
import { resetRoute, useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
// import { useQuestionnaireInUrl } from './util';
import styled from '@emotion/styled';
import { BackTopDiv, SubmitButton } from '../../components/lib';
import { ScreenContainer } from '../../components/lib';
import { EPQTestItem } from './EPQ/test-item';
import { useQuestionnaireIdInUrl } from '../test/util';
import { postBDI13, postEPQ, postFMPS, postNEOFFI, postPF16, postPPS, postPSSS, postSAS, postSDS, postSPM, postSTAI } from '../../utils/fixedQuestionnaire';
import { PPSTestItem } from './PPS/test-item';
import { FMPSTestItem } from './FMPS/test-item';
import { NEOFFITestItem } from './NEOFFI/test-item';
import { SDSTestItem } from './SDS/test-item';
import { SASTestItem } from './SAS/test-item';
import { BDI13TestItem } from './BDI13/test-item';
import { STAITestItem } from './STAI/test-item';
import { SPMTestItem } from './SPM/test-item';
import { PF16TestItem } from './PF16/test-item';
import { PSSSTestItem } from './PSSS/test-item';


export const FixedTestScreen = () => {

  const [form] = useForm();

  // const { data: currentQuestionnaire } = useQuestionnaireInUrl()
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




  const tempRes: number[] = []
  // 提交的同时清空数据
  const onFinish = async (values: any) => {
    const res: number[] = Object.values(values); //对象转化为数组
    form.resetFields();
    let status;
    switch (questionnaireId) {
      case 1:
        status = await postEPQ(res);
        break;
      case 2:
        status = await postPPS(res);
        break;
      case 3:
        status = await postFMPS(res);
        break;
      case 4:
        status = await postNEOFFI(res);
        break;
      case 5:
        status = await postPF16(res);
        break;
      case 6:
        status = await postSDS(res);
        break;
      case 7:
        status = await postSAS(res);
        break;
      case 8:
        status = await postBDI13(res);
        break;
      case 9:
        status = await postPSSS(res);
        break;
      case 10:
        status = await postSTAI(res);
        break;
      case 11:
        status = await postSPM(res);
        break;
    }
    if (status === true) {
      window.location.replace('finish');
    } else {
      //提交失败，请检查网络连接 
    }
  }

  const questionnaireId = Number(useQuestionnaireIdInUrl());

  return (
    <ScreenContainer>
      <QuestionnaireContainer>
        {
          <TestForm
            labelCol={{ span: 50 }}
            wrapperCol={{ span: 50 }}
            layout={"vertical"}
            onFinish={onFinish}
            form={form}
          >
            {
              questionnaireId === 1 ? (
                <EPQTestItem />
              ) : questionnaireId === 2 ? (
                <PPSTestItem />
              ) : questionnaireId === 3 ? (
                <FMPSTestItem />
              ) : questionnaireId === 4 ? (
                <NEOFFITestItem />
              ) : questionnaireId === 5 ? (
                <PF16TestItem />
              ) : questionnaireId === 6 ? (
                <SDSTestItem />
              ) : questionnaireId === 7 ? (
                <SASTestItem />
              ) : questionnaireId === 8 ? (
                <BDI13TestItem />
              ) : questionnaireId === 9 ? (
                <PSSSTestItem />
              ) : questionnaireId === 10 ? (
                <STAITestItem />
              ) : questionnaireId === 11 ? (
                <SPMTestItem />
              ) : null
            }
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
  margin-left: 4rem;
  text-align: center;
  width: 90%;
`
const TestForm = styled(Form)`
  width: 100%;
  margin-bottom: 50px;
  padding-bottom: 50px;
`
