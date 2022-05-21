import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Dropdown, Pagination, Space, Table, Tag } from "antd";
import { useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import qs from 'qs'
import * as auth from '../../auth-provider'




export const UserManageScreen = () => {
  const client = useHttp();

  const { isLoading, error, data } = useUserByPage(1, 15);
  const [pageIndex, setPageIndex] = useState(() => 1);
  const [pageSize, setPageSize] = useState(() => 15);
  const defaultList = data?.list;
  const defaultPager = data?.pager;
  const [list, setList] = useState(defaultList);
  const [pager, setPager] = useState(defaultPager);

  let token = JSON.parse(auth.getToken());
  const changePage = async (pageIndex: number, pageSize: number) => {
    setPageIndex(() => pageIndex);
    setPageSize(() => pageSize);
    const tempDate = { pageIndex, pageSize }
    const headers = { auth: token };
    const data = await http(`sys/user/findByPage?${qs.stringify(tempDate)}`, { headers })
    console.log(data);
    setList(() => data?.list);
    setPager(() => data?.pager);
  }


  const columns = [
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number) => <span>{userId}</span>,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      render: (userName: number) => <span>{userName}</span>,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: number) => gender === 0 ? <span>男</span> : <span>女</span>
    },
    {
      title: '账号',
      dataIndex: 'idNumber',
      key: 'idNumber',
      render: (idNumber: number) => <span>{idNumber}</span>,
    },
    {
      title: '身份',
      dataIndex: 'authorityId',
      key: 'authorityId',
      render: (authorityId: number) => (authorityId === 1 ? <Tag>超级管理员</Tag> :
        authorityId === 2 ? <Tag>普通管理员</Tag> : <Tag>普通用户</Tag>)
    },
    {
      title: '组别',
      dataIndex: 'userGroup',
      key: 'userGroup',
      render: (userGroup: number) => <span>{userGroup}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: () => <Button>编辑</Button>,
    },
  ];


  return <ScreenContainer>
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={pageIndex === 1 ? defaultList : list}
      size={"small"}
    />
    <Pagination
      defaultCurrent={1}
      defaultPageSize={15}
      // current={pager?.pageIndex}
      total={defaultPager.itemCount}
      onChange={changePage}
    />
  </ScreenContainer>
}