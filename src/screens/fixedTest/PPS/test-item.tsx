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
import { FixedList } from '../../../types/questionnaireTest'
import { useQuestionnaireTest } from '../../../utils/questionnaireTest';
import styled from '@emotion/styled';
import { usePPS } from '../../../utils/fixedQuestionnaire';
import { useDocumentTitle, useMount } from '../../../utils';
import { useAsync } from '../../../utils/use-async';
import { RadioChangeEventTarget } from 'antd/lib/radio';
import { QuestionnaireDescription, QuestionnaireTitle } from '..';

const { Option } = Select;

// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const PPSTestItem = () => {


  const { TextArea } = Input;

  const { isLoading, error, data: PPS } = usePPS();
  const instruction = PPS?.instruction;
  const allTests = PPS?.list;
  // const {instruction, list} = PPS.data

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
              <Radio key={test.option1} value={test.option1}>{test.option1}</Radio>
              <Radio key={test.option2} value={test.option2}>{test.option2}</Radio>
              <Radio key={test.option3} value={test.option3}>{test.option3}</Radio>
              <Radio key={test.option4} value={test.option4}>{test.option4}</Radio>
              <Radio key={test.option5} value={test.option5}>{test.option5}</Radio>
              <Radio key={test.option6} value={test.option6}>{test.option6}</Radio>
              <Radio key={test.option7} value={test.option7}>{test.option7}</Radio>
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
