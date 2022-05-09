import { useQuery } from "react-query";
import { cleanObject } from ".";
import { QuestionnaireEdit } from "../types/questionnaireEdit";
import { useHttp } from "./http";

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