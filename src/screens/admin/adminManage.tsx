import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Drawer, Dropdown, Form, Input, message, Modal, Pagination, Popconfirm, Select, Space, Table, Tag, Typography } from "antd";
import { addAdmin, addUser, getUserDetailById, updateUser, useAdminByPage, useAllGroup, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';
import { useForm } from 'antd/es/form/Form';

const { Option } = Select;


interface Item {
  adminId: number;
  adminName: string;
  adminState: number;
  adminGroup: number;
  authorityId: number;
}

interface GroupItem {
  id: number;
  groupName: string;
}

export const AdminManageScreen = () => {
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true })

  const [updateForm] = useForm();



  const { data: allGroups } = useAllGroup();
  const { isLoading, error, data } = useAdminByPage(1, 10);
  const [pageIndex, setPageIndex] = useState(() => 1);
  const [pageSize, setPageSize] = useState(() => 10);
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
    const data = await http(`sys/admin/findByPage?${qs.stringify(tempDate)}`, { headers })
    console.log(data);
    setList(() => data?.list);
    setPager(() => data?.pager);
  }

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddClick = (values: { adminName: string, password: string, cpassword: string, idNumber: string }) => {
    if (values.cpassword !== values.password) {
      message.error("请输入两次相同的密码")
      return
    }
    const tempPwd = CryptoJs.MD5(values.password).toString();
    const tempForm = {
      adminName: values.adminName,
      password: tempPwd
    }
    run(addAdmin(tempForm).catch((error: Error) => message.error(error)))
    closeAddModal();
    window.location.reload();
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'adminId',
      key: 'adminId',
      render: (adminId: number) => <span>{adminId}</span>,
    },
    {
      title: '用户名',
      dataIndex: 'adminName',
      key: 'adminName',
      render: (adminName: number) => <span>{adminName}</span>,
    },
    {
      title: '状态',
      dataIndex: 'adminState',
      key: 'adminState',
      render: (adminState: number) => adminState === 1 ? <span>正常</span> : <span>停用</span>
    },
    {
      title: '组别',
      dataIndex: 'adminGroup',
      key: 'adminGroup',
      render: (adminGroup: number) => <span>{adminGroup}</span>,
    },
    {
      title: '身份',
      dataIndex: 'authorityId',
      key: 'authorityId',
      render: (authorityId: number) => (authorityId === 1 ? <Tag>超级管理员</Tag> :
        authorityId === 2 ? <Tag>普通管理员</Tag> : <Tag>普通用户</Tag>)
    },
  ];



  return <ScreenContainer>
    <Button type='primary' onClick={showAddModal}>添加管理员</Button>
    <Table
      pagination={false}
      loading={isLoading}
      columns={columns}
      dataSource={pageIndex === 1 ? defaultList : list}
      size={"small"}
    />
    <Pagination
      defaultCurrent={1}
      defaultPageSize={10}
      total={defaultPager?.itemCount}
      onChange={changePage}
    />

    <Drawer
      title="添加用户"
      visible={isAddModalVisible}
      onClose={closeAddModal}
    >
      <Form onFinish={handleAddClick}>
        <Form.Item name={'adminName'} rules={[{ required: true, message: '请输入管理员账号' }]}>
          <Input placeholder={'账号'} type="text" id={'adminName'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: '请输入用密码' }]}>
          <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
          <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>添加</LongButton>
        </Form.Item>
      </Form>
    </Drawer>
  </ScreenContainer >
}