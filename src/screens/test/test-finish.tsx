import React, { useState } from 'react'
import { useForm } from "antd/es/form/Form"
import { useDocumentTitle } from '../../utils'
import { ScreenContainer } from '../../components/lib';
import { ReactComponent as LoginLogo } from '../../assets/login-logo.svg'



export const TestFinishScreen = () => {

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



  useDocumentTitle(currentQuestionnaire?.title ? currentQuestionnaire?.title : '问卷完成');

  return (
    <ScreenContainer>
      <LoginLogo style={{ margin: -10, }} height={'5rem'} width={'5rem'} color={'rgb(38, 132, 255)'} />
      <h1>问卷到此结束，感谢您的参与</h1>
    </ScreenContainer>
  )
}

