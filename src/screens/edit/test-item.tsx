import React, { useEffect, useState } from 'react'
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
import { CreateTest } from './create-test';
import { TestItemCard } from '../test/test-item';
import { useEditTestModal } from './util';

const { Option } = Select;
const { TextArea } = Input;


// export const TestItem = ({ test }: { test: QuestionnaireTest }) => {
export const TestItem = () => {
  const { startEdit } = useEditTestModal();
  const { data: allTests } = useQuestionnaireTest();

  return <>
    {
      allTests?.map((test, index) =>
        <TestItemCard
          hoverable
          key={test.id}
          onClick={() => startEdit(test.id)}
        >
          <TestTitle><strong>{index + 1}</strong>、{test.title}</TestTitle>
          <TestDescription>{test.description}</TestDescription>
          {
            +test.type === 0 ? (
              // return <Radio.Group onChange={onChange} value={value}>
              <span>
                {`非常不${gaugeType.find(type => type.id === test.gaugeType)?.name}  `}
                <Radio.Group>
                  {
                    new Array(test.gaugeRange).fill(0).map((radio, index) => <Radio key={radio} value={index + 1}>{index + 1}</Radio>)
                  }
                </Radio.Group>
                {`  非常${gaugeType.find(type => type.id === test.gaugeType)?.name}`}
              </span>
            ) : +test.type === 1 ? (
              // return <Radio.Group onChange={onChange} value={value}>
              <Radio.Group>
                <Space direction="vertical">
                  {
                    test.options ? JSON.parse(test.options).map((option: string, index: number) =>
                      <Radio key={option} value={index}>{option}</Radio>
                    )
                      : null
                  }
                  {/* <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio> */}
                </Space>
              </Radio.Group>
            ) : +test.type === 2 ? (
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
            ) : +test.type === 3 ? (
              <Input placeholder="请输入您的答案" />
            ) : +test.type === 4 ? (
              <TextArea placeholder="请输入您的答案" rows={4} />
            ) : +test.type === 5 ? (
              <Select defaultValue="lucy" style={{ width: 400 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            ) : (<div>暂无匹配题型</div>)
          }
        </TestItemCard>
      )
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

const TestTitle = styled.h3`
  width: 100%;
  font-size: 1.5rem;
  font-weight: normal;
`
const TestDescription = styled.p`
  color: gray;
  font-size: 1.2rem;
  margin-top: 1rem;
`