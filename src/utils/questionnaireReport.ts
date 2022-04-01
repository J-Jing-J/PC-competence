import { useQuery } from "react-query";
import { cleanObject } from ".";
import { QuestionnaireReportType } from "../types/questionnaireReport";
import { useHttp } from "./http";

export const useQuestionnaireReport = (inputContent?: Partial<QuestionnaireReportType>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<displayedListType[]>()
  // const fetchQuestionnaire = useCallback(() => client('questionnaires', { data: cleanObject(inputContent || {}) }), [client, inputContent])
  // useEffect(() => {
  //   // client返回一个promise，而run需要接收一个promise
  //   run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
  // }, [inputContent, run, fetchQuestionnaire]);
  // return result
  return useQuery<QuestionnaireReportType[]>(['report', inputContent], () =>
    client('report', { data: cleanObject(inputContent || {}) }))
}