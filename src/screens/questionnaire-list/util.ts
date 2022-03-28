import { useMemo } from "react";
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