import React from 'react'
import { useDocumentTitle } from '../../utils'
import { useQuestionnaireReport } from '../../utils/questionnaireReport';
import { useQuestionnaireInUrl } from './util';


export const ReportQuestionnaireScreen = () => {
  useDocumentTitle('报表');
  // const { data: currentQuestionnaire } = useQuestionnaireInUrl()
  const currentQuestionnaire = {
    "id": 0,
    "title": "问卷1",
    "discription": "问卷说明",
    "typeId": 1,
    "fullScore": 150,
    "rank": "名次--暂无",
    "creater": "创建人",
    "createTime": "1546900800000",
    "logo": "logo",
    "pin": true
  }
  // const { data: reports } = useQuestionnaireReport()
  const reports = [
    {
      name: '报告标题1',
    },
    {
      name: '报告标题2',
    }
  ]
  return <>
    <h1>{currentQuestionnaire?.title}报表</h1>
    {
      reports?.map(report => <div>
        {report.name}
      </div>)
    }
  </>
} 