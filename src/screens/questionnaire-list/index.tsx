import { List } from "./list"
import { SearchPanel } from "./search-panel"
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { cleanObject, useDebounce, useMount } from "../../utils"
import * as qs from "qs"
import { useHttp } from "../../utils/http"

const apiUrl = process.env.REACT_APP_API_URL

export const QuestionnaireListScreen = () => {


  // input搜索框里的数据
  const [inputContent, setInputContent] = useState({
    title: '',  //input里的
    id: ''     //select里的,代表type的id
  })

  // 查找之后展示的数据
  const [displayedList, setDisplayedList] = useState([])

  const [questionnaireTypes, setQuestionnaireTypes] = useState([]);

  // 输入框内容停留2s，才发送请求
  const debouncedInputContent = useDebounce(inputContent, 200);

  const client = useHttp();

  // questionnaire变化时请求接口
  useEffect(() => {
    client('questionnaires', { data: cleanObject(debouncedInputContent) }).then(setDisplayedList)
    // console.log(qs.stringify(cleanObject(inputContent)));
    //name=${inputContent.name}&typeId=${inputContent.id}
    // fetch(`${apiUrl}/questionnaires?${qs.stringify(cleanObject(debouncedInputContent))}`).then(async response => {
    //   if (response.ok) {
    //     // console.log(await response.json());
    //     setDisplayedList(await response.json())
    //   }
    // })
  }, [debouncedInputContent])


  // 页面加载时加载questionnaireTypes类型
  // 自定义hook
  useMount(() => {
    client('questionnaireTypes').then(setQuestionnaireTypes)
    // fetch(`${apiUrl}/questionnaireTypes`).then(async response => {
    //   if (response.ok) {
    //     setQuestionnaireTypes(await response.json())
    //   }
    // })
  })

  return <Container>
    <h1>问卷列表</h1>
    <SearchPanel questionnaireTypes={questionnaireTypes} inputContent={inputContent} setInputContent={setInputContent} />
    <List questionnaireTypes={questionnaireTypes} displayedList={displayedList} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`