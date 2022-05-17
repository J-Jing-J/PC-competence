import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
import { cleanObject } from ".";
import { QuestionnaireEdit } from "../types/questionnaireEdit";
import { useHttp } from "./http";
import { QuestionnaireTest } from "../types/questionnaireTest";
import { useUrlQueryParam } from "./url";

export const useQuestionnaireEdit = (inputContent?: Partial<QuestionnaireEdit>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<displayedListType[]>()
  // const fetchQuestionnaire = useCallback(() => client('questionnaires', { data: cleanObject(inputContent || {}) }), [client, inputContent])
  // useEffect(() => {
  //   // client返回一个promise，而run需要接收一个promise
  //   run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
  // }, [inputContent, run, fetchQuestionnaire]);
  // return result
  return useQuery<QuestionnaireEdit[]>(['edit', inputContent], () =>
    client('edit', { data: cleanObject(inputContent || {}) }))
}

// 添加问卷中的问题
export const useAddTest = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<QuestionnaireTest>) =>
      client(`tests`, {
        method: 'POST',
        data: params
      }),
    // useMutation的第二个参数可用key取出值自动刷新
    useAddConfig(queryKey)
  )
}

// 获取问题详情
export const useTest = (id?: number) => {
  const client = useHttp();
  return useQuery(
    // questionnaire是缓存的key
    // {id}是变化时触发刷新
    ['test', { id }],
    () => client(`tests/${id}`),
    // useQuery的第三个参数是配置参数，只有在id有值时才触发
    { enabled: Boolean(id) }
  )
}

// 收藏问卷
export const useEditTest = (queryKey: QueryKey) => {
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
    (params: Partial<QuestionnaireTest>) =>
      client(`tests/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    // useMutation的第二个参数可用key取出值自动刷新
    useEditConfig(queryKey)
  )
}