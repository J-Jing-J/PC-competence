import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Drawer, Dropdown, Form, Input, message, Modal, Pagination, Space, Table, Tag, Typography } from "antd";
import { addGroup, addUser, deleteGroup, updateGroup, useGroupByPage, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';
import { useForm } from 'antd/es/form/Form';




export const GroupManageScreen = () => {
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true })
  const [updateForm] = useForm();


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

  const handleAddClick = (values: { groupName: string }) => {
    const tempForm = {
      groupName: values.groupName,
    }
    run(addGroup(tempForm).catch((error: Error) => message.error(error)))
    closeAddModal();
    window.location.reload();
  }

  const edit = async (id: number, groupName: string) => {
    console.log(id, groupName);
    updateForm.setFieldsValue({ id, groupName })
    showModifyModal();
  }

  // ????????????
  const handleDeleteGroup = (id: number) => {
    run(deleteGroup(id).catch((error: Error) => message.error(error)));
    message.error("????????????");
    window.location.reload();
  }

  const handleUpdateClick = (values: { id: number, groupName: string }) => {
    const tempForm = {
      id: values.id,
      groupName: values.groupName
    }
    run(updateGroup(tempForm).catch((error: Error) => message.error(error)))
    closeModifyModal();
    window.location.reload();
  }


  interface Item {
    id: number;
    groupName: string;
  }
  const columns = [
    {
      title: '?????????ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span>{id}</span>,
    },
    {
      title: '????????????',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (groupName: number) => <span>{groupName}</span>,
    },
    {
      title: '??????',
      key: 'action',
      render: (_: any, record: Item) => {
        return (
          <span>
            <Typography.Link onClick={() => edit(record.id, record.groupName)}>
              ??????
            </Typography.Link>
            <span>  </span>
            <Typography.Link onClick={() => handleDeleteGroup(record.id)}>
              ??????
            </Typography.Link>
          </span>
        );
      },
    },
  ];


  return <ScreenContainer>
    <Button type='primary' onClick={showAddModal}>???????????????</Button>
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
    <Drawer title="???????????????" visible={isAddModalVisible}>
      <Form onFinish={handleAddClick}>
        <Form.Item name={'groupName'} rules={[{ required: true, message: '???????????????' }]}>
          <Input placeholder={'???????????????'} id={'groupName'} />
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
        <Form.Item label={"?????????ID"} name={'id'}>
          <Input aria-disabled disabled placeholder={'?????????ID'} type="text" id={'id'} />
        </Form.Item>
        <Form.Item label={"????????????"} name={'groupName'}>
          <Input placeholder={'????????????'} type="text" id={'groupName'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>??????</LongButton>
        </Form.Item>
      </Form>
    </Drawer>
  </ScreenContainer>
}