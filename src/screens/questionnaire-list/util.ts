import { useMemo } from "react";
import { useQuestionnaire } from "../../utils/questionnaire";
import { useUrlQueryParam } from "../../utils/url";

// 搜索问卷
export const useQuestionnairesSearchParams = () => {
  // input搜索框里的数据
  // const [, setInputContent] = useState({
  //   title: '',  //input里的
  //   id: ''     //select里的,代表type的id
  // })
  // 从url中得到的都是string类型，需要转换
  const [inputContent, setInputContent] = useUrlQueryParam(['title', 'typeId']);
  return [
    useMemo(() => ({ ...inputContent, typeId: Number(inputContent.typeId) || undefined }), [inputContent]),
    setInputContent
  ] as const
}

// 取出Questionnaire的queryKey
export const useQuestionnaireQueryKey = () => {
  const [params] = useQuestionnairesSearchParams()
  return ['questionnaires', params];
}

// 读取url里对应的参数，相当于全局状态管理器
export const useQuestionnaireModal = () => {
  const [{ questionnaireCreate }, setQuestionnaireCreate] = useUrlQueryParam([
    'questionnaireCreate'
  ])
  const [{ editingQuestionnaireId }, setEditingQuestionnaireId] = useUrlQueryParam([
    'editingQuestionnaireId'
  ])

  const { data: editingQuestionnaire, isLoading } = useQuestionnaire(Number(editingQuestionnaireId))


  const open = () => setQuestionnaireCreate({ questionnaireCreate: true });
  const close = () => {
    setQuestionnaireCreate({ questionnaireCreate: undefined });
    setEditingQuestionnaireId({ editingQuestionnaireId: undefined });
  }
  const startEdit = (id: number) => setEditingQuestionnaireId({ editingQuestionnaireId: id })

  return {
    questionnaireModalOpen: questionnaireCreate === 'true' || Boolean(editingQuestionnaire),
    open,
    close,
    startEdit,
    editingQuestionnaire,
    isLoading
  }
}

