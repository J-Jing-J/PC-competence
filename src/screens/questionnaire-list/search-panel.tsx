import { Input, Select } from 'antd';
import React from 'react'
import { useEffect, useState } from "react"

export interface questionnaireType {
  id: string;
  name: string
}

interface SearchPanelProps {
  questionnaireTypes: questionnaireType[],
  inputContent: {
    title: string;
    id: string;
  },
  setInputContent: (inputContent: SearchPanelProps['inputContent']) => void;
}

export const SearchPanel = ({ questionnaireTypes, inputContent, setInputContent }: SearchPanelProps) => {



  // select选择框里要显示的的问卷类型


  return <form>
    <div>
      <Input type="text" value={inputContent.title} onChange={evt => {
        setInputContent({
          ...inputContent,
          title: evt.target.value
        })
      }} />
      <Select
        value={inputContent.id}
        onChange={value => setInputContent({
          ...inputContent,
          id: value
        })} >
        <Select.Option value={''}>问卷类型</Select.Option>
        {
          questionnaireTypes.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
        }
      </Select>
    </div>
  </form>
}