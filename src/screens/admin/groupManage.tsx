import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Dropdown, Form, Input, message, Modal, Pagination, Space, Table, Tag } from "antd";
import { addUser, useGroupByPage, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';




export const GroupManageScreen = () => {
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true })

  const { isLoading, error, data } = useGroupByPage(1, 10);
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

  const handleAddClick = (values: { groupName: string, groupDescription: string }) => {
    // run(addUser(values).catch((error: Error) => message.error(error)))
    closeModal();
  }

  const columns = [


    {
      title: '测试组ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span>{id}</span>,
    },
    {
      title: '小组名称',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (groupName: number) => <span>{groupName}</span>,
    },
    {
      title: '查看详情',
      render: () => <Button size='small' type='primary'>编辑</Button>,
    },
    {
      title: '操作',
      render: () => <Button size='small' type='primary'>编辑</Button>,
    },
  ];


  return <ScreenContainer>
    <Button onClick={showModal}>添加测试组</Button>
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={pageIndex === 1 ? defaultList : list}
      size={"small"}
      pagination={false}
    />
    <Pagination
      defaultCurrent={1}
      defaultPageSize={10}
      total={defaultPager?.itemCount}
      onChange={changePage}
    />
    <Modal title="添加用户" visible={isModalVisible}>
      <Form onFinish={handleAddClick}>
        <Form.Item name={'groupName'} rules={[{ required: true, message: '测试组名称' }]}>
          <Input placeholder={'手机号'} id={'groupName'} />
        </Form.Item>
        <Form.Item name={'groupDescription'}>
          <Input placeholder={'用户名'} id={'groupDescription'} />
        </Form.Item>
        <Form.Item>s
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
        </Form.Item>
      </Form>
    </Modal>
  </ScreenContainer>
}