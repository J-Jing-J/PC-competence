import { List } from "./list"
import { displayedListType } from '../../types/questionnaire'
import { SearchPanel } from "./search-panel"
import React, { useState, useEffect, Profiler } from 'react'
import styled from '@emotion/styled'
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils"
// import { useQuestionnaireTypes } from "../../utils/questionnaire-types"
import { useQuestionnaireModal, useQuestionnairesSearchParams } from "./util"
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib"
import { useAuth } from "../../context/auth-context"
import { fixedQuestionnaireData } from "../../common/constants/fixQuestionnaire"

const apiUrl = process.env.REACT_APP_API_URL

export const QuestionnaireListScreen = () => {
  const { user } = useAuth()
  const { open } = useQuestionnaireModal()
  useDocumentTitle('心理量表', false)
  const [inputContent, setInputContent] = useQuestionnairesSearchParams()
  // const [inputContent] = useUrlQueryParam(['title', 'id'])

  // 问卷类型
  // const [questionnaireTypes, setQuestionnaireTypes] = useState([]);

  // 输入框内容停留2s，才发送请求
  // const debouncedInputContent = useDebounce(inputContentNum, 200);

  // const client = useHttp();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null)
  // 查找之后展示的数据
  // const [displayedList, setDisplayedList] = useState([])
  // const { run, isLoading, error, data: displayedList } = useAsync<displayedListType[]>()


  // const { isLoading, error, data: displayedList } = useQuestionnaires(useDebounce(inputContent, 200));
  const displayedList: displayedListType[] = [];  //正确写法在上面
  let ListData = [...fixedQuestionnaireData, ...displayedList]


  // questionnaire变化时请求接口
  // useEffect(() => {
  // client返回一个promise，而run需要接收一个promise
  // run(client('questionnaires', { data: cleanObject(debouncedInputContent) }))
  // 或
  //name=${inputContent.name}&typeId=${inputContent.id}
  // fetch(`${apiUrl}/questionnaires?${qs.stringify(cleanObject(debouncedInputContent))}`).then(async response => {
  //   if (response.ok) {
  //     // console.log(await response.json());
  //     setDisplayedList(await response.json())
  //   }
  // })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedInputContent])


  // 页面加载时加载questionnaireTypes类型
  // 自定义hook
  // useMount(() => {
  //   client('questionnaireTypes')
  //     .then(setQuestionnaireTypes)
  // fetch(`${apiUrl}/questionnaireTypes`).then(async response => {
  //   if (response.ok) {
  //     setQuestionnaireTypes(await response.json())
  //   }
  // })
  // })

  // const { data: questionnaireTypes } = useQuestionnaireTypes()

  // 设置网页的document.title


  return (
    <Container>
      {/* <Helmet><title>问卷中心</title></Helmet> */}
      <Row between={true}>
        <h1>心理量表</h1>
        {
          user?.identity === 1 ?
            <ButtonNoPadding
              onClick={open}
              type={"link"}>
              创建量表
            </ButtonNoPadding>
            : null
        }
      </Row>
      {/* <SearchPanel questionnaireTypes={questionnaireTypes || []} inputContent={inputContent} setInputContent={setInputContent} /> */}
      {/* <ErrorBox error={error} /> */}
      <ErrorBox />
      <List
        // refresh={retry}
        // loading={isLoading}
        // questionnaireTypes={questionnaireTypes || []}
        dataSource={fixedQuestionnaireData || []}
      // questionnaireButton={
      //   <ButtonNoPadding
      //     onClick={open}
      //     type={"link"}>
      //     创建量表
      //   </ButtonNoPadding>
      // }
      />
    </Container>
  )
}

QuestionnaireListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`