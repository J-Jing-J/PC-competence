import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import { EditQuestionnaireScreen } from '../edit'
import { TestQuestionnaireScreen } from '../test'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useAuth } from '../../context/auth-context'
import { TestFinishScreen } from '../test/test-finish'
import { FixedTestScreen } from '../fixedTest'
import { Aside, Container, Main } from '../../components/lib'
import { AllTestRecordScreen } from '../allTestRecord'
import { AdminDetailScreen } from './adminDetail'
import { UserManageScreen } from './userManage'
import { AdminManageScreen } from './adminManage'
import { TaskManageScreen } from './taskManage'
import { GroupManageScreen } from './groupManage'
import { GameManageScreen } from './gameManage'


// 因为Menu不会自动高亮，手动获取url最后的单词，设置selectedKeys
const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
}

export const AdminScreen = () => {

  const { user } = useAuth();

  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'adminDetail'}>
            <Link style={{ marginRight: '10px' }} to={'adminDetail'}>用户信息</Link>
          </Menu.Item>
          <Menu.Item key={'userManage'}>
            <Link style={{ marginRight: '10px' }} to={'userManage'}>用户管理</Link>
          </Menu.Item>
          <Menu.Item key={'adminManage'}>
            <Link style={{ marginRight: '10px' }} to={'adminManage'}>管理员管理</Link>
          </Menu.Item>
          <Menu.Item key={'groupManage'}>
            <Link style={{ marginRight: '10px' }} to={'groupManage'}>测试组管理</Link>
          </Menu.Item>
          <Menu.Item key={'taskManage'}>
            <Link style={{ marginRight: '10px' }} to={'taskManage'}>任务管理</Link>
          </Menu.Item>
          <Menu.Item key={'gameManage'}>
            <Link style={{ marginRight: '10px' }} to={'gameManage'}>游戏管理</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'adminDetail'} element={<AdminDetailScreen />}></Route>
          <Route path={'userManage'} element={<UserManageScreen />}></Route>
          <Route path={'adminManage'} element={<AdminManageScreen />}></Route>
          <Route path={'groupManage'} element={<GroupManageScreen />}></Route>
          <Route path={'taskManage'} element={<TaskManageScreen />}></Route>
          <Route path={'gameManage'} element={<GameManageScreen />}></Route>
          {/* <Route path={'finish'} element={<TestFinishScreen />}></Route> */}
          <Route path="*" element={<Navigate to={window.location.pathname + '/adminDetail'} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  )
}


