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
} from 'antd';
import { QuestionnaireTest } from '../../types/questionnaireTest'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import styled from '@emotion/styled';



// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const TestItem = () => {

  const { TextArea } = Input;

  const { data: allTests } = useQuestionnaireTest();


  // const tests = allTests?.filter(test => test.id === xxx.id)

  return <>
    {
      allTests?.map(test => <TestItemCard key={test.id}>
        <h3>{test.title}</h3>
        {
          +test.type === 0 ? (
            // return <Radio.Group onChange={onChange} value={value}>
            <TestFormItem label="单选题" name="">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                </Space>
              </Radio.Group>
            </TestFormItem>
          ) : +test.type === 1 ? (
            <TestFormItem label="多选题" name="">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </TestFormItem>
          ) : +test.type === 2 ? (
            <TestFormItem label="Input题型" name="">
              <Input />
            </TestFormItem>
          ) : +test.type === 3 ? (
            <TestFormItem label="TextArea题型" name="">
              <TextArea rows={4} />
            </TestFormItem>
          ) : (<div>暂无匹配题型</div>)
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
`

const TestItemCard = styled(Card)`
  margin-bottom: 0.5rem;
  margin-top: 20px;
`
