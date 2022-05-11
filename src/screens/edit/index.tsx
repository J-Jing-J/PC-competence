import React from 'react'
import { ScreenContainer } from '../../components/lib'
import { QuestionnaireDescription, QuestionnaireTitle } from '../test'
import { CreateTest } from './create-test'

export const EditQuestionnaireScreen = () => {

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


  return (
    <ScreenContainer>
      <QuestionnaireTitle>{currentQuestionnaire?.title}</QuestionnaireTitle>
      <QuestionnaireDescription>{currentQuestionnaire?.discription}</QuestionnaireDescription>
      <CreateTest />
    </ScreenContainer>
  )
}