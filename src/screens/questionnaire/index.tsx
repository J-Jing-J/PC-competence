import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import { EditQuestionnaireScreen } from '../edit'
import { SettingQuestionnaireScreen } from '../setting'
import { TestQuestionnaireScreen } from '../test'
import styled from '@emotion/styled'
import { Menu } from 'antd'

// 因为Menu不会自动高亮，手动获取url最后的单词，设置selectedKeys
const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
}

export const QuestionaireScreen = () => {

  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'test'}>
            <Link style={{ marginRight: '10px' }} to={'test'}>报表</Link>
          </Menu.Item>
          <Menu.Item key={'edit'}>
            <Link style={{ marginRight: '10px' }} to={'edit'}>编辑</Link>
          </Menu.Item>
          <Menu.Item key={'setting'}>
            <Link style={{ marginRight: '10px' }} to={'setting'}>设置</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'test'} element={<TestQuestionnaireScreen />}></Route>
          <Route path={'edit'} element={<EditQuestionnaireScreen />}></Route>
          <Route path={'setting'} element={<SettingQuestionnaireScreen />}></Route>
          {/* <Navigate to={window.location.pathname + '/data'} /> */}
          <Route path="*" element={<Navigate to={window.location.pathname + '/test'} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
  /* position: sticky;
  top: 6rem;
  height: 100vh; */
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`