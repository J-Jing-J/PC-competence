import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react'
import { useEffect, useState } from "react"
import { QuestionnaireTypeSelect } from '../../components/type-select';
import { displayedListType } from '../../types/questionnaire'


export interface questionnaireType {
  id: number;
  name: string
}

interface SearchPanelProps {
  questionnaireTypes: questionnaireType[],
  inputContent: Partial<Pick<displayedListType, 'title' | 'typeId'>>
  // inputContent: {
  //   title: string;
  //   id: string;
  // },
  setInputContent: (inputContent: SearchPanelProps['inputContent']) => void;
}

export const SearchPanel = ({ questionnaireTypes, inputContent, setInputContent }: SearchPanelProps) => {



  // select选择框里要显示的的问卷类型


  return <Form layout={"inline"} style={{ marginBottom: '2rem' }}>
    <Form.Item>
      <Input
        type="text"
        placeholder={'问卷名称'}
        value={inputContent.title}
        onChange={evt => {
          setInputContent({
            ...inputContent,
            title: evt.target.value
          })

        }} />
    </Form.Item>
    <Form.Item>
      <QuestionnaireTypeSelect
        defaultOptionName={'问卷类型'}
        value={inputContent.typeId}
        onChange={value => setInputContent({
          ...inputContent,
          typeId: value
        })}
      >
      </QuestionnaireTypeSelect>
      {/* <Select
        value={inputContent.typeId}
      >
        <Select.Option value={''}>问卷类型</Select.Option>
        {
          questionnaireTypes.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
        }
      </Select> */}
    </Form.Item>
  </Form>
}