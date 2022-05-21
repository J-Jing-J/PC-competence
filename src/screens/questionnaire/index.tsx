import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import { EditQuestionnaireScreen } from '../edit'
import { TestRecordScreen } from '../user/testRecord'
import { TestQuestionnaireScreen } from '../test'
import { Menu } from 'antd'
import { useAuth } from '../../context/auth-context'
import { TestFinishScreen } from '../test/test-finish'
import { FixedTestScreen } from '../fixedTest'
import { Aside, Container, Main } from '../../components/lib'

// 因为Menu不会自动高亮，手动获取url最后的单词，设置selectedKeys
const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
}

export const QuestionaireScreen = () => {

  const { user } = useAuth();

  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'fixedTest'}>
            <Link style={{ marginRight: '10px' }} to={'fixedTest'}>量表</Link>
          </Menu.Item>
          {/* <Menu.Item key={'test'}>
            <Link style={{ marginRight: '10px' }} to={'test'}>问卷</Link>
          </Menu.Item> */}
          <Menu.Item key={'record'}>
            <Link style={{ marginRight: '10px' }} to={'record'}>测试历史</Link>
          </Menu.Item>
          {
            user?.identity === 1 ?
              <Menu.Item key={'edit'}>
                <Link style={{ marginRight: '10px' }} to={'edit'}>编辑</Link>
              </Menu.Item> : null
          }
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'fixedTest'} element={<FixedTestScreen />}></Route>
          <Route path={'test'} element={<TestQuestionnaireScreen />}></Route>
          <Route path={'edit'} element={<EditQuestionnaireScreen />}></Route>
          <Route path={'record'} element={<TestRecordScreen />}></Route>
          <Route path={'finish'} element={<TestFinishScreen />}></Route>
          {/* <Navigate to={window.location.pathname + '/data'} /> */}
          <Route path="*" element={<Navigate to={window.location.pathname + '/fixedTest'} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  )
}


