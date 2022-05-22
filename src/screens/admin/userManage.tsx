import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Drawer, Dropdown, Form, Input, message, Modal, Pagination, Popconfirm, Select, Space, Table, Tag, Typography } from "antd";
import { addUser, getUserDetailById, updateUser, useAllGroup, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';
import { useForm } from 'antd/es/form/Form';

const { Option } = Select;


interface Item {
  userId: number;
  userName: string;
  gender: number;
  idNumber: number;
  authorityId: number;
  userGroup: number
}
interface GroupItem {
  id: number;
  groupName: string;
}

export const UserManageScreen = () => {
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true })

  const [updateForm] = useForm();



  const { data: allGroups } = useAllGroup();
  // const allGroupOptions: Node[] = [];
  // allGroups?.map((group: GroupItem) => <Option value={group.id} key={group.id}>{group.groupName}</Option>)
  const { isLoading, error, data } = useUserByPage(1, 10);
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

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const showModifyModal = () => {
    setIsModifyModalVisible(true);
  };
  const closeModifyModal = () => {
    setIsModifyModalVisible(false);
  };

  const handleAddClick = (values: { userId: string, password: string, cpassword: string, idNumber: string }) => {
    if (values.cpassword !== values.password) {
      message.error("请输入两次相同的密码")
      return
    }
    const tempPwd = CryptoJs.MD5(values.password).toString();
    const tempForm = {
      idNumber: values.idNumber,
      password: tempPwd,
      userName: values.userId
    }
    run(addUser(tempForm).catch((error: Error) => message.error(error)))
    closeAddModal();
  }

  const [userInfo, setUserInfo] = useState<Item>();
  const [currentGroup, setCurrentGroup] = useState<GroupItem>();
  const edit = async (userId: number) => {
    const currentUser = await getUserDetailById(userId);
    const user = currentUser.data;
    if (user.gender === 0) {
      user.gender = '男'
    } else {
      user.gender = '女'
    }
    setUserInfo(() => user);

    updateForm.setFieldsValue(currentUser.data)
    showModifyModal();
  }

  const handleUpdateClick = (values: { userId: string, gender: number, userGroup: number }) => {
    const tempForm = {
      userId: values.userId,
      gender: values.gender,
      userGroup: values.userGroup
    }
    run(updateUser(tempForm).catch((error: Error) => message.error(error)))
    closeModifyModal();
    window.location.reload();
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
      render: (userName: string) => <span>{userName}</span>,
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
      render: (userGroup: number) => {
        let showGroup;
        allGroups?.forEach((group: GroupItem) => {
          if (+group.id === +userGroup) {
            setCurrentGroup(() => group);
            showGroup = <Tag color={'green'}>{group.groupName}</Tag>
          } else {
            <Tag color={'green'}>默认分组</Tag>
          }
        })
        return showGroup
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Item) => {
        return (
          <Typography.Link onClick={() => edit(record.userId)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];



  return <ScreenContainer>
    <Button type='primary' onClick={showAddModal}>添加用户</Button>
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
        <Form.Item name={'idNumber'} rules={[{ required: true, message: '请输入账号' }]}>
          <Input placeholder={'账号'} type="text" id={'idNumber'} />
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
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>添加</LongButton>
        </Form.Item>
      </Form>
    </Drawer>


    <Drawer
      title="修改用户信息"
      visible={isModifyModalVisible}
      onClose={closeModifyModal}
    >
      <Form form={updateForm} onFinish={handleUpdateClick}>
        <Form.Item label={"用户ID"} name={'userId'}>
          <Input aria-disabled disabled placeholder={'用户ID'} type="text" id={'userId'} />
        </Form.Item>
        <Form.Item
          initialValue={userInfo?.gender === 0 ? '男' : userInfo?.gender === 1 ? '女' : '未知'}
          label={"性别"} name={'gender'} rules={[{ required: true, message: '请输入性别' }]}>
          <Select
            id={'gender'}
            style={{ width: 120 }}>
            <Option value={0}>男</Option>
            <Option value={1}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"测试组别"} name={'userGroup'}>
          <Select
            id={'userGroup'}
            defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allGroups?.map((group: GroupItem) => <Option value={group.id}>{group.groupName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>确定</LongButton>
        </Form.Item>


      </Form>
    </Drawer>


  </ScreenContainer >
}