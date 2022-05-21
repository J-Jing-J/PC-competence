import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Dropdown, Form, Input, message, Modal, Pagination, Space, Table, Tag } from "antd";
import { addUser, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';




export const UserManageScreen = () => {
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true })


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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddClick = (values: { username: string, password: string, cpassword: string, telephoneNumber: string }) => {
    if (values.cpassword !== values.password) {
      message.error("请输入两次相同的密码")
      return
    }
    const tempPwd = CryptoJs.MD5(values.password).toString();
    const tempForm = {
      idNumber: values.telephoneNumber,
      password: tempPwd,
      userName: values.username
    }
    run(addUser(tempForm).catch((error: Error) => message.error(error)))
    closeModal();
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
    <Button onClick={showModal}>添加用户</Button>
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={pageIndex === 1 ? defaultList : list}
      size={"small"}
    />
    <Pagination
      defaultCurrent={1}
      defaultPageSize={15}
      total={defaultPager?.itemCount}
      onChange={changePage}
    />
    <Modal title="添加用户" visible={isModalVisible}>
      <Form onFinish={handleAddClick}>
        <Form.Item name={'telephoneNumber'} rules={[{ required: true, message: '请输入手机号' }]}>
          <Input placeholder={'手机号'} type="telephoneNumber" id={'telephoneNumber'} />
        </Form.Item>
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: '请输入用密码' }]}>
          <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
          <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
        </Form.Item>
        {/* <Form.Item name={'email'} >
      <Input placeholder={'邮箱（选填）'} type="email" id={'email'} />
    </Form.Item> */}
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
        </Form.Item>
      </Form>
    </Modal>
  </ScreenContainer>
}