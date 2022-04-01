import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { User } from "../types/user";
import { questionnaireType } from "../screens/questionnaire-list/search-panel";

export const useQuestionnaireTypes = (param?: Partial<questionnaireType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<questionnaireType[]>();
  useEffect(() => {
    run(client("questionnaireTypes", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
