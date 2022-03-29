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

  const fetchQuestionnaire = () => client('questionnaires', { data: cleanObject(inputContent || {}) })
  useEffect(() => {
    // client返回一个promise，而run需要接收一个promise
    run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputContent])
  return result
}

// 收藏问卷
export const useEditQuestionnaires = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<displayedListType>) => {
    return run(client(`questionnaires/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

// 添加问卷
export const useAddQuestionnaires = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<displayedListType>) => {
    return run(client(`questionnaires${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}