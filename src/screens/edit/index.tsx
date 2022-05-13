import styled from '@emotion/styled'
import React, { useState } from 'react'
import { BackTop } from 'antd';
import { BackTopDiv, ScreenContainer } from '../../components/lib'
import { useDocumentTitle } from '../../utils'
import { QuestionnaireDescription, QuestionnaireTitle } from '../test'
import { CreateTest } from './create-test'
import { TestEditColumn } from './test-edit-column'
import { TestTypeColumn } from './test-type-column'
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const EditQuestionnaireScreen = () => {

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

  const [addType, setAddType] = useState(10);

  


  // const addTypeChange = (setAddType: Function) => {}

  useDocumentTitle('编辑问卷');

  return (
    <ScreenContainer>
      {/* <CreateTest /> */}
      <ColumnsContainer>
        <TestTypeColumn setAddType={setAddType} />
        <TestEditColumn addType={addType} setAddType={setAddType} />
      </ColumnsContainer>
      {/* <TaskModal /> */}
      <BackTop>
        <BackTopDiv>UP</BackTopDiv>
      </BackTop>
    </ScreenContainer >
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  /* overflow-x: scroll; */
`;

