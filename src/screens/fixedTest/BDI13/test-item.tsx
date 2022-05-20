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
import { useBDI13 } from '../../../utils/fixedQuestionnaire';
import { useDocumentTitle, useMount } from '../../../utils';
import { useAsync } from '../../../utils/use-async';
import { RadioChangeEventTarget } from 'antd/lib/radio';
import { QuestionnaireDescription, QuestionnaireTitle } from '..';

const { Option } = Select;

// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const BDI13TestItem = () => {


  const { TextArea } = Input;

  const { isLoading, error, data: BDI13 } = useBDI13();
  const instruction = BDI13?.instruction;
  const allTests = BDI13?.list;
  // const {instruction, list} = BDI13.data

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
              <Radio key={test.option1} value={1}>{test.option1}</Radio>
              <Radio key={test.option2} value={2}>{test.option2}</Radio>
              <Radio key={test.option3} value={3}>{test.option3}</Radio>
              <Radio key={test.option4} value={4}>{test.option4}</Radio>
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
