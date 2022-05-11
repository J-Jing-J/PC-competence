import { useLocation } from 'react-router'
import { useQuestionnaire } from '../../utils/questionnaire';

// 从url中拿到questionnaire的id
export const useQuestionnaireIdInUrl = () => {
  const { pathname } = useLocation();
  // 取第二个参数，因为match方法的第二个参数是括号里的匹配项
  const id = pathname?.match(/questionnaires\/(\d+)/)?.[1];
  console.log('id', id);
  return Number(id);
}

// 通过id请求问卷数据
export const useQuestionnaireInUrl = () => {
  // console.log(111, useQuestionnaire(Number(useQuestionnaireIdInUrl())));
  return useQuestionnaire(useQuestionnaireIdInUrl());
}

export const useTestSearchParams = () => ({ questionnaireId: useQuestionnaireIdInUrl() })
export const useTestQueryKey = () => ['tests', useTestSearchParams()];

export const useHistorySearchParams = () => ({ questionnaireId: useQuestionnaireIdInUrl() });
export const useHistoryQueryKey = () => ['history', useHistorySearchParams()];
