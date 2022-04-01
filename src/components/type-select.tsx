import React from 'react'
import { useQuestionnaireTypes } from '../utils/questionnaire-types'
import { IdSelect } from './id-select'

// 按类型搜索的参数
export const QuestionnaireTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: types } = useQuestionnaireTypes()
  return <IdSelect options={types || []} {...props}></IdSelect>
}