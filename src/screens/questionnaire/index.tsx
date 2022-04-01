import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { EditQuestionnaireScreen } from '../edit'
import { SettingQuestionnaireScreen } from '../setting'
import { ReportQuestionnaireScreen } from '../report'
import styled from '@emotion/styled'

export const QuestionaireScreen = () => {
  return <div>
    <h1>QuestionaireScreen</h1>
    <Link style={{ marginRight: '10px' }} to={'/edit'}>编辑</Link>
    <Link style={{ marginRight: '10px' }} className='link' to={'/setting'}>设置</Link>
    <Link style={{ marginRight: '10px' }} className='link' to={'/report'}>报表</Link>
    <Routes>
      <Route path={'report'} element={<ReportQuestionnaireScreen />}></Route>
      <Route path={'edit'} element={<EditQuestionnaireScreen />}></Route>
      <Route path={'setting'} element={<SettingQuestionnaireScreen />}></Route>
      {/* <Navigate to={window.location.pathname + '/data'} /> */}
      <Route path="*" element={<Navigate to={window.location.pathname + '/report'} replace={true} />} />
    </Routes>
  </div>
}

