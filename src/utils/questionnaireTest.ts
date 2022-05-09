import { useQuery } from "react-query";
import { cleanObject } from ".";
import { QuestionnaireTest } from "../types/questionnaireTest";
import { useHttp } from "./http";

// 获取Test列表
export const useQuestionnaireTest = (inputContent?: Partial<QuestionnaireTest>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<displayedListType[]>()
  // const fetchQuestionnaire = useCallback(() => client('questionnaires', { data: cleanObject(inputContent || {}) }), [client, inputContent])
  // useEffect(() => {
  //   // client返回一个promise，而run需要接收一个promise
  //   run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
  // }, [inputContent, run, fetchQuestionnaire]);
  // return result
  return useQuery<QuestionnaireTest[]>(['tests', inputContent], () =>
    client('tests', { data: cleanObject(inputContent || {}) }))
}