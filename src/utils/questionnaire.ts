// 合并use-async
import { useState, useEffect } from 'react'
import { displayedListType } from '../screens/questionnaire-list/list'
import { cleanObject } from "../utils"
import { useAsync } from "../utils/use-async"
import { useHttp } from './http'

// inputContent：要传入的搜索的对象
// displayedListType：问卷类型
// 传入要搜索的id和name，都是displayedListType类型的一部分
export const useQuestionnaires = (inputContent?: Partial<displayedListType>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<displayedListType[]>()
  useEffect(() => {
    // client返回一个promise，而run需要接收一个promise
    run(client('questionnaires', { data: cleanObject(inputContent || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputContent])
  return result
}