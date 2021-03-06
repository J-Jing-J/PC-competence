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
      message.error("??????????????????????????????")
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
      user.gender = '???'
    } else {
      user.gender = '???'
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
      title: '??????id',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number) => <span>{userId}</span>,
    },
    {
      title: '?????????',
      dataIndex: 'userName',
      key: 'userName',
      render: (userName: string) => <span>{userName}</span>,
    },
    {
      title: '??????',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: number) => gender === 0 ? <span>???</span> : <span>???</span>
    },
    {
      title: '??????',
      dataIndex: 'idNumber',
      key: 'idNumber',
      render: (idNumber: number) => <span>{idNumber}</span>,
    },
    {
      title: '??????',
      dataIndex: 'authorityId',
      key: 'authorityId',
      render: (authorityId: number) => (authorityId === 1 ? <Tag color={"gold"}>???????????????</Tag> :
        authorityId === 2 ? <Tag color={"geekblue"}>???????????????</Tag> : <Tag color={"green"}>????????????</Tag>)
    },
    {
      title: '??????',
      dataIndex: 'userGroup',
      key: 'userGroup',
      render: (userGroup: number) => {
        let showGroup;
        allGroups?.forEach((group: GroupItem) => {
          if (+group.id === +userGroup) {
            setCurrentGroup(() => group);
            showGroup = <Tag color={'green'}>{group.groupName}</Tag>
          }
        })
        return showGroup || <Tag>????????????</Tag>
      }
    },
    {
      title: '??????',
      key: 'action',
      render: (_: any, record: Item) => {
        return (
          <Typography.Link onClick={() => edit(record.userId)}>
            ??????
          </Typography.Link>
        );
      },
    },
  ];



  return <ScreenContainer>
    <Button type='primary' onClick={showAddModal}>????????????</Button>
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
      title="????????????"
      visible={isAddModalVisible}
      onClose={closeAddModal}
    >
      <Form onFinish={handleAddClick}>
        <Form.Item name={'idNumber'} rules={[{ required: true, message: '???????????????' }]}>
          <Input placeholder={'??????'} type="text" id={'idNumber'} />
        </Form.Item>
        <Form.Item name={'username'} rules={[{ required: true, message: '??????????????????' }]}>
          <Input placeholder={'?????????'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: '??????????????????' }]}>
          <Input placeholder={'??????'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{ required: true, message: '???????????????' }]}>
          <Input placeholder={'????????????'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>??????</LongButton>
        </Form.Item>
      </Form>
    </Drawer>


    <Drawer
      title="??????????????????"
      visible={isModifyModalVisible}
      onClose={closeModifyModal}
    >
      <Form form={updateForm} onFinish={handleUpdateClick}>
        <Form.Item label={"??????ID"} name={'userId'}>
          <Input aria-disabled disabled placeholder={'??????ID'} type="text" id={'userId'} />
        </Form.Item>
        <Form.Item
          initialValue={userInfo?.gender === 0 ? '???' : userInfo?.gender === 1 ? '???' : '??????'}
          label={"??????"} name={'gender'} rules={[{ required: true, message: '???????????????' }]}>
          <Select
            id={'gender'}
            style={{ width: 120 }}>
            <Option value={0}>???</Option>
            <Option value={1}>???</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"????????????"} name={'userGroup'}>
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
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>??????</LongButton>
        </Form.Item>
      </Form>
    </Drawer>


  </ScreenContainer >
}