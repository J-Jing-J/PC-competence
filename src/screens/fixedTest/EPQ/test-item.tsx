import React, { useState } from 'react'
import {
  Checkbox,
  Col,
  Row,
  Space,
  Form,
  Input,
  Radio,
  Card,
  Select,
  InputNumber,
  RadioChangeEvent
} from 'antd';
import { FixedList, gaugeType, QuestionnaireTest } from '../../../types/questionnaireTest'
import { useQuestionnaireTest } from '../../../utils/questionnaireTest';
import styled from '@emotion/styled';
import { getEPQ, useEPQ } from '../../../utils/fixedQuestionnaire';
import { useDocumentTitle, useMount } from '../../../utils';
import { useAsync } from '../../../utils/use-async';
import { RadioChangeEventTarget } from 'antd/lib/radio';
import { QuestionnaireDescription, QuestionnaireTitle } from '..';

const { Option } = Select;

// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const EPQTestItem = () => {

  const { isLoading, data: EPQ } = useEPQ();
  const instruction = EPQ?.instruction;
  const allTests = EPQ?.list;
  // const {instruction, list} = EPQ.data

  // useDocumentTitle(instruction.testName ? instruction.testName : '量表');

  const tempRes: number[] = []
  const onChange = (value: number, index: number) => {
    tempRes[index] = value;
    console.log(tempRes);
  }

  return <>
    <QuestionnaireTitle>{instruction?.testName}</QuestionnaireTitle>
    <QuestionnaireDescription>{instruction?.testDescription}</QuestionnaireDescription>
    {
      allTests?.map((test: FixedList, index: number) => <TestItemCard loading={isLoading} key={test.id}>
        {
          <TestFormItem
            label={
              `${test.id}. ${test.questionName}`
            }
            name={`${test.id}`}
          // rules={[{ required: true, message: '请至少选择一项' }]}
          >
            <Radio.Group style={{ width: '100%' }}
              onChange={(e) => onChange(e.target.value, index)}>
              <Radio key={test.point1} value={test.point1}>{test.option1}</Radio>
              <Radio key={test.point2} value={test.point1}>{test.option2}</Radio>
            </Radio.Group>
          </TestFormItem>
        }
      </TestItemCard>)
    }
  </>
}

const TestFormItem = styled(Form.Item)`
  margin-top: 20px;
  overflow: scroll;
  flex: 1;
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
`

export const TestItemCard = styled(Card)`
  padding: 0 0 2rem 15rem;
  margin-top: 0.5rem;
  width: 100%;
  min-height: 20rem;
  cursor: pointer;
`
