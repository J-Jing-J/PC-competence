import React from 'react'
import { testTypes } from '../common/constants/test'
import { useQuestionnaireTypes } from '../utils/questionnaire-types'
import { IdSelect } from './id-select'

// 按类型搜索的参数
export const QuestionnaireTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: types } = useQuestionnaireTypes()
  return <IdSelect options={types || []} {...props}></IdSelect>
}

// 按类型搜索的参数
export const TestTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const types = testTypes;
  return <IdSelect options={types || []} {...props}></IdSelect>
}