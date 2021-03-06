import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import { EditQuestionnaireScreen } from '../edit'
import { TestRecordScreen } from './testRecord'
import { TestQuestionnaireScreen } from '../test'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useAuth } from '../../context/auth-context'
import { TestFinishScreen } from '../test/test-finish'
import { FixedTestScreen } from '../fixedTest'
import { Aside, Container, Main } from '../../components/lib'
import { AllTestRecordScreen } from '../allTestRecord'
import { UserTaskScreen } from './userTask'
import { AccountDetailScreen } from './accountDetail'
import { ResetPasswordScreen } from './resetPassword'
import { AdminDetailScreen } from '../admin/adminDetail'
import { UserManageScreen } from '../admin/userManage'
import { AdminManageScreen } from '../admin/adminManage'
import { GroupManageScreen } from '../admin/groupManage'
import { TaskManageScreen } from '../admin/taskManage'
import { GameManageScreen } from '../admin/gameManage'


// 因为Menu不会自动高亮，手动获取url最后的单词，设置selectedKeys
const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
}

export const AccountScreen = () => {

  const { user } = useAuth();

  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'accountDetail'}>
            <Link style={{ marginRight: '10px' }} to={'accountDetail'}>用户信息</Link>
          </Menu.Item>
          <Menu.Item key={'testRecord'}>
            <Link style={{ marginRight: '10px' }} to={'testRecord'}>测试评估记录</Link>
          </Menu.Item>
          <Menu.Item key={'userTask'}>
            <Link style={{ marginRight: '10px' }} to={'userTask'}>任务中心</Link>
          </Menu.Item>
          <Menu.Item key={'resetPassword'}>
            <Link style={{ marginRight: '10px' }} to={'resetPassword'}>修改密码</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'accountDetail'} element={<AccountDetailScreen />}></Route>
          <Route path={'testRecord'} element={<AllTestRecordScreen />}></Route>
          <Route path={'userTask'} element={<UserTaskScreen />}></Route>
          <Route path={'resetPassword'} element={<ResetPasswordScreen />}></Route>
          {/* <Route path={'finish'} element={<TestFinishScreen />}></Route> */}
          <Route path="*" element={<Navigate to={window.location.pathname + '/accountDetail'} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  )
}


