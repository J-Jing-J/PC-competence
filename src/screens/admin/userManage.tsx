import React, { useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { useTestRecord } from "../../utils/user"

export const UserManageScreen = () => {
  const { isLoading, error, data } = useTestRecord();
  const record = data?.record;

  const columns = [
    {
      title: '序号',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (taskName: string) => <span>{taskName}</span>,
    },
    {
      title: '用户名',
      dataIndex: 'factorE',
      key: 'factorE',
      render: (factorE: number) => <span>{factorE}</span>,
    },
    {
      title: '账号',
      dataIndex: 'factorL',
      key: 'factorL',
      render: (factorL: number) => <span>{factorL}</span>,
    },
    {
      title: '神经质分数',
      dataIndex: 'factorN',
      key: 'factorN',
      render: (factorN: number) => <span>{factorN}</span>,
    },
    {
      title: '测试组',
      dataIndex: 'factorP',
      key: 'factorP',
      render: (factorP: number) => <span>{factorP}</span>,
    },
    {
      title: '操作',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => <span>{createTime}</span>,
    },
  ];

  return <ScreenContainer>
    <Table columns={columns} dataSource={record} />
  </ScreenContainer>
}