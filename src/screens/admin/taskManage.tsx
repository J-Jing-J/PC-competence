import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, DatePicker, Drawer, Dropdown, Form, Input, message, Modal, Pagination, Popconfirm, Select, Space, Table, Tag, TimePicker, Typography } from "antd";
import { addTask, addUser, getTaskDetailById, getUserDetailById, updateTask, updateUser, useAllGroup, useAllTest, useTaskByPage, useUserByPage } from '../../utils/admin';
import { http, useHttp } from '../../utils/http';
import CryptoJs from 'crypto-js'
import qs from 'qs'
import * as auth from '../../auth-provider'
import { LongButton } from '../../unauthenticated-app';
import { useAsync } from '../../utils/use-async';
import { useForm } from 'antd/es/form/Form';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Item {
  id: number;
  taskName: string;
  groupId: number;
  status: number;
  startTime: string;
  endTime: string;
  questionnaireIds: []
}
interface GroupItem {
  id: number;
  groupName: string;
}
interface TestItem {
  id: number
  testName: string
  testDescription?: string
}

export const TaskManageScreen = () => {
  const { run } = useAsync(undefined, { throwOnError: true });
  

  const [updateForm] = useForm();

  const { data: allGroups } = useAllGroup();
  const { data: allTests } = useAllTest();
  // const allGroupOptions: Node[] = [];
  // allGroups?.map((group: GroupItem) => <Option value={group.id} key={group.id}>{group.groupName}</Option>)
  const { isLoading, error, data } = useTaskByPage(1, 10);
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
    const data = await http(`sys/task/findByPage?${qs.stringify(tempDate)}`, { headers })
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

  const handleAddClick = (values: { time: string, groupId: number, questionnaireIds: [], status: number, taskName: string }) => {
    const tempForm = {
      groupId: values.groupId,
      questionnaireIds: values.questionnaireIds,
      status: values.status,
      taskName: values.taskName,
      startTime: new Date(values.time[0].valueOf()).toLocaleString(),
      endTime: new Date(values.time[1].valueOf()).toLocaleString()
    }
    run(addTask(tempForm).catch((error: Error) => message.error(error)))
    closeAddModal();
  }

  const [taskInfo, setTaskInfo] = useState<Item>();
  const [currentGroup, setCurrentGroup] = useState<GroupItem>();
  const [tempQuestionnaireIds, setTempQuestionnaireIds] = useState<GroupItem>();
  const edit = async (taskId: number) => {
    const currentTask = await getTaskDetailById(taskId);
    const task = currentTask.data;
    if (task.status === 1) {
      task.status = '?????????'
    } else if (task.status === 0) {
      task.status = '?????????'
    } else {
      task.status = '?????????'
    }
    allGroups?.forEach((group: GroupItem) => {
      if (+group.id === +task.GroupId) {
        task.groupId = group.groupName;
      }
    })
    const tempQs: string[] = [];
    [...task.questionnaireIds].forEach((q: number) => {
      allTests?.forEach((test: TestItem) => {
        if (+test.id === +q) {
          tempQs.push(test.testName);
        }
      })
    })
    task.questionnaireIds = tempQs;
    setTaskInfo(() => task);
    updateForm.setFieldsValue(currentTask.data)
    showModifyModal();
  }

  const handleUpdateClick = (values: { time: string, groupId: number, questionnaireIds: [], status: number, taskName: string }) => {
    const tempForm = {
      groupId: values.groupId,
      questionnaireIds: values.questionnaireIds,
      status: values.status,
      taskName: values.taskName,
      startTime: new Date(values.time[0].valueOf()).toLocaleString(),
      endTime: new Date(values.time[1].valueOf()).toLocaleString()
    }
    console.log(values.questionnaireIds);

    run(updateTask(tempForm).catch((error: Error) => message.error(error)))
    closeModifyModal();
    // window.location.reload();
  }


  const columns = [
    {
      title: '??????',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span>{id}</span>,
    },
    {
      title: '????????????',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (taskName: number) => <span>{taskName}</span>,
    },
    {
      title: '?????????',
      dataIndex: 'groupId',
      key: 'groupId',
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
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        if (status === 1) {
          return <Tag color={"success"}>?????????</Tag>
        } else if (status === 0) {
          return <Tag color={"processing"}>?????????</Tag>
        } else {
          return <Tag>?????????</Tag>
        }
      },
    },
    {
      title: '????????????',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime: number) => <span>{startTime}</span>,
    },
    {
      title: '????????????',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime: number) => <span>{endTime}</span>,
    },
    {
      title: '????????????',
      dataIndex: 'questionnaireIds',
      key: 'questionnaireIds',
      render: (questionnaireIds: number) => <span>{questionnaireIds}</span>,
    },
    {
      title: '??????',
      key: 'action',
      render: (_: any, record: Item) => {
        return (
          <Typography.Link onClick={() => edit(record.id)}>
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
      width={'100%'}
    >
      <Form onFinish={handleAddClick}>
        <Form.Item name={'taskName'} rules={[{ required: true, message: '??????????????????' }]}>
          <Input placeholder={'????????????'} type="text" id={'taskName'} />
        </Form.Item>
        <Form.Item
          label={"????????????"} name={'groupId'}>
          <Select
            id={'groupId'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allGroups?.map((group: GroupItem) => <Option value={group.id}>{group.groupName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'status'} rules={[{ required: true, message: '???????????????' }]}>
          <Select
            id={'status'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            <Option value={1}>?????????</Option>
            <Option value={0}>?????????</Option>
            <Option value={-1}>?????????</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"????????????"} name={'questionnaireIds'}>
          <Select
            mode="multiple"
            id={'questionnaireIds'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allTests?.map((test: TestItem) => <Option value={test.id}>{test.testName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'time'} rules={[{ required: true, message: '???????????????' }]}>
          <RangePicker id={'time'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>??????</LongButton>
        </Form.Item>
      </Form>
    </Drawer>


    <Drawer
      title="????????????"
      visible={isModifyModalVisible}
      onClose={closeModifyModal}
      width={'100%'}
    >
      <Form form={updateForm} onFinish={handleUpdateClick}>
        <Form.Item label={"??????ID"} name={'id'}>
          <Input aria-disabled disabled placeholder={'??????ID'} type="text" id={'id'} />
        </Form.Item>
        <Form.Item name={'taskName'} rules={[{ required: true, message: '??????????????????' }]}>
          <Input placeholder={'?????????'} type="text" id={'taskName'} />
        </Form.Item>
        <Form.Item
          label={"????????????"} name={'groupId'}>
          <Select
            id={'groupId'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allGroups?.map((group: GroupItem) => <Option value={group.id}>{group.groupName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'status'} rules={[{ required: true, message: '???????????????' }]}>
          <Select
            id={'status'}
            style={{ width: 120 }}>
            <Option value={1}>?????????</Option>
            <Option value={0}>?????????</Option>
            <Option value={-1}>?????????</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"????????????"} name={'questionnaireIds'}>
          <Select
            mode="multiple"
            id={'questionnaireIds'}
            defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allTests?.map((test: TestItem) => <Option value={test.id}>{test.testName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'time'} rules={[{ required: true, message: '???????????????' }]}>
          <RangePicker id={'time'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>??????</LongButton>
        </Form.Item>
      </Form>
    </Drawer>
  </ScreenContainer >
}