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
  InputNumber
} from 'antd';
import { gaugeType, QuestionnaireTest } from '../../types/questionnaireTest'
import { useQuestionnaireTest } from '../../utils/questionnaireTest';
import styled from '@emotion/styled';

const { Option } = Select;

// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const TestItem = () => {

  const { TextArea } = Input;

  const { data: allTests } = useQuestionnaireTest();


  return <>
    {
      allTests?.map(test => <TestItemCard key={test.id}>
        {
          +test.type === 0 ? (
            // return <Radio.Group onChange={onChange} value={value}>
            <TestFormItem
              label={
                `${test.id + 1}. ${test.title}`
              }
              name={`${test.id}`}
              rules={[{ required: true, message: '请至少选择一项' }]}
            >
              <span>
                {`非常不${gaugeType.find(type => type.id === test.gaugeType)?.name}  `}
                <Radio.Group>
                  {
                    new Array(test.gaugeMax).fill(0).map((radio, index) => <Radio value={index + 1}>{index + 1}</Radio>)
                  }
                </Radio.Group>
                {`  非常${gaugeType.find(type => type.id === test.gaugeType)?.name}`}
              </span>
            </TestFormItem>
          ) : +test.type === 1 ? (
            // return <Radio.Group onChange={onChange} value={value}>
            <TestFormItem
              label={`${test.id + 1}. ${test.title}`}
              name={`${test.id}`}
              rules={[{ required: true, message: '请至少选择一项' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                </Space>
              </Radio.Group>
            </TestFormItem>
          ) : +test.type === 2 ? (
            <TestFormItem
              label={`${test.id + 1}. ${test.title}`}
              name={`${test.id}`}
              rules={[{ required: true, message: '请至少选择一项' }]}
            >
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
          ) : +test.type === 3 ? (
            <TestFormItem
              label={`${test.id + 1}. ${test.title}`}
              name={`${test.id}`}
            >
              <Input placeholder="请输入您的答案" />
            </TestFormItem>
          ) : +test.type === 4 ? (
            <TestFormItem
              label={`${test.id + 1}. ${test.title}`}
              name={`${test.id}`}
            >
              <TextArea placeholder="请输入您的答案" rows={4} />
            </TestFormItem>
          ) : +test.type === 5 ? (
            <TestFormItem
              label={`${test.id + 1}. ${test.title}`}
              name={`${test.id}`}
            >
              <Select defaultValue="lucy" style={{ width: 400 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
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

export const TestItemCard = styled(Card)`
  margin-bottom: 0.5rem;
  margin-top: 20px;
`
