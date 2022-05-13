import React, { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Input
} from 'antd';
import { useForm } from "antd/es/form/Form"
import { resetRoute, useDocumentTitle } from '../../utils'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import { TestItem } from './test-item';
import styled from '@emotion/styled';
import { SubmitButton } from '../../components/lib';
import { ScreenContainer } from '../../components/lib';
import { CreateTest } from './create-test';
import { useQuestionnaireIdInUrl, useTestQueryKey } from '../test/util';
import { useAddTest } from '../../utils/questionnaireEdit';
import { TestItemCard } from '../test/test-item';

interface TestEditColumnProps {
  addType: number
  setAddType: (typeId: number) => void
}

export const TestEditColumn = (props: TestEditColumnProps) => {

  const [finishAddTest, setFinishAddTest] = useState(false)
  useEffect(() => { }, [finishAddTest]);

  const { addType, setAddType } = props;

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

  const [title, setTitle] = useState(currentQuestionnaire.title);
  const [description, setDescription] = useState(currentQuestionnaire.description);
  const [inputTitleMode, setInputTitleMode] = useState(false);
  const [inputDescriptionMode, setInputDescriptionMode] = useState(false);

  const questionnaireId = useQuestionnaireIdInUrl();
  // const { mutateAsync: addTest } = useAddTest(useTestQueryKey());

  const submitTitle = () => {
    // await 
    setInputTitleMode(false);
    // setTitle(value);
  }

  const submitDescription = () => {
    // await 
    setInputDescriptionMode(false);
    // setDescription(value);
  }


  const openTitleInput = () => {
    setInputTitleMode(true);
    setInputDescriptionMode(false);
  }

  const openDescriptionInput = () => {
    setInputDescriptionMode(true);
    setInputTitleMode(false);
  }

  const toggleTitleMode = () => setInputTitleMode(mode => !mode);
  const toggleDescriptionMode = () => setInputDescriptionMode(mode => !mode);


  // useEffect(() => {
  //   if (!inputTitleMode) {
  //     setTitle('');
  //   }
  // }, [inputTitleMode, inputDescriptionMode])

  return (
    <ScreenContainer>
      <QuestionnaireContainer>
        {
          inputTitleMode ? (
            <TitleCard>
              <Input
                style={{ width: '30rem' }}
                onBlur={toggleTitleMode}
                value={title}
                placeholder={'请输入问卷题目'}
                autoFocus={true}
                onPressEnter={submitTitle}
                onChange={evt => setTitle(evt.target.value)}
              />
              <Button type='primary' onClick={submitTitle}>确定</Button>
            </TitleCard>
          ) : (
            <TitleCard onClick={openTitleInput}>
              <QuestionnaireTitle>{currentQuestionnaire?.title}</QuestionnaireTitle>
            </TitleCard>
          )
        }
        {
          inputDescriptionMode ? (
            <TitleCard>
              <Input
                style={{ width: '30rem' }}
                onBlur={toggleDescriptionMode}
                value={description}
                placeholder={'请输入问卷备注'}
                autoFocus={true}
                onPressEnter={submitDescription}
                onChange={evt => setDescription(evt.target.value)}
              />
              <Button type='primary' onClick={submitDescription}>确定</Button>
            </TitleCard>
          ) : (
            <TitleCard onClick={openDescriptionInput}>
              <QuestionnaireDescription>{currentQuestionnaire?.description}</QuestionnaireDescription>
            </TitleCard>
          )
        }
        <TestItem />
        {
          addType < 10 ? <CreateTest finishAddTest={finishAddTest} setFinishAddTest={setFinishAddTest} addType={addType} setAddType={setAddType} /> : null
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

const TitleCard = styled.div`
  min-height: 10rem;
  padding: 0 0 2rem 15rem;
  margin-top: 0.5rem;
  width: 100%;
  text-align: center;
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
