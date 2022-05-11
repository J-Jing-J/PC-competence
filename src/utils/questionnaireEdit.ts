import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
import { cleanObject } from ".";
import { QuestionnaireEdit } from "../types/questionnaireEdit";
import { useHttp } from "./http";
import { QuestionnaireTest } from "../types/questionnaireTest";

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