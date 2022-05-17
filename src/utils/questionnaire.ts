// 合并use-async
import Item from 'antd/lib/list/Item';
import { useState, useEffect, useCallback } from 'react'
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { displayedListType } from '../types/questionnaire'
import { useQuestionnairesSearchParams } from '../screens/questionnaire-list/util';
import { cleanObject } from "../utils"
import { useAsync } from "../utils/use-async"
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

// inputContent：要传入的搜索的对象
// displayedListType：问卷类型
// 传入要搜索的id和name，都是displayedListType类型的一部分
export const useQuestionnaires = (inputContent?: Partial<displayedListType>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<displayedListType[]>()
  // const fetchQuestionnaire = useCallback(() => client('questionnaires', { data: cleanObject(inputContent || {}) }), [client, inputContent])
  // useEffect(() => {
  //   // client返回一个promise，而run需要接收一个promise
  //   run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
  // }, [inputContent, run, fetchQuestionnaire]);
  // return result
  return useQuery<displayedListType[]>(['questionnaires', inputContent], () => client('questionnaires', { data: cleanObject(inputContent || {}) }))
}

// 收藏问卷
export const useEditQuestionnaires = (queryKey: QueryKey) => {
  const client = useHttp()
  // const { run, ...asyncResult } = useAsync()
  // const mutate = (params: Partial<displayedListType>) => {
  //   return run(client(`questionnaires/${params.id}`, {
  //     data: params,
  //     method: 'PATCH'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
  // 用原来存储时传入的数据，拿到key
  return useMutation(
    (params: Partial<displayedListType>) =>
      client(`questionnaires/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    // useMutation的第二个参数可用key取出值自动刷新
    useEditConfig(queryKey)
  )
}

// 添加问卷
export const useAddQuestionnaires = (queryKey: QueryKey) => {
  const client = useHttp()
  // const { run, ...asyncResult } = useAsync()
  // const mutate = (params: Partial<displayedListType>) => {
  //   return run(client(`questionnaires${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
  return useMutation(
    (params: Partial<displayedListType>) => client(`questionnaires`, {
      method: 'POST',
      data: params
    }),
    // useMutation的第二个参数可用key取出值自动刷新
    useAddConfig(queryKey)
  )
}

// 删除问卷
export const useDeleteQuestionnaires = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`questionnaires/${id}`, {
      method: 'DELETE'
    }),
    // useMutation的第二个参数可用key取出值自动刷新
    useDeleteConfig(queryKey)
  )
}

// 获取量表详情
export const useQuestionnaire = (id?: number) => {
  const client = useHttp();
  return useQuery(
    // questionnaire是缓存的key
    // {id}是变化时触发刷新
    ['questionnaire', { id }],
    () => client(`questionnires/${id}`),
    // useQuery的第三个参数是配置参数，只有在id有值时才触发
    { enabled: Boolean(id) }
  )
}