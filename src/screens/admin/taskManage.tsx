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
      task.status = '已发布'
    } else if (task.status === 0) {
      task.status = '未发布'
    } else {
      task.status = '已过期'
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
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span>{id}</span>,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (taskName: number) => <span>{taskName}</span>,
    },
    {
      title: '测试组',
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
        return showGroup || <Tag>未知分组</Tag>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        if (status === 1) {
          return <Tag color={"success"}>已发布</Tag>
        } else if (status === 0) {
          return <Tag color={"processing"}>未发布</Tag>
        } else {
          return <Tag>已过期</Tag>
        }
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime: number) => <span>{startTime}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime: number) => <span>{endTime}</span>,
    },
    {
      title: '测试内容',
      dataIndex: 'questionnaireIds',
      key: 'questionnaireIds',
      render: (questionnaireIds: number) => <span>{questionnaireIds}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Item) => {
        return (
          <Typography.Link onClick={() => edit(record.id)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];




  return <ScreenContainer>
    <Button type='primary' onClick={showAddModal}>分配任务</Button>
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
      title="分配任务"
      visible={isAddModalVisible}
      onClose={closeAddModal}
      width={'100%'}
    >
      <Form onFinish={handleAddClick}>
        <Form.Item name={'taskName'} rules={[{ required: true, message: '请输入任务名' }]}>
          <Input placeholder={'任务名称'} type="text" id={'taskName'} />
        </Form.Item>
        <Form.Item
          label={"测试组别"} name={'groupId'}>
          <Select
            id={'groupId'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allGroups?.map((group: GroupItem) => <Option value={group.id}>{group.groupName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'status'} rules={[{ required: true, message: '请选择状态' }]}>
          <Select
            id={'status'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            <Option value={1}>已发布</Option>
            <Option value={0}>未发布</Option>
            <Option value={-1}>已过期</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"任务内容"} name={'questionnaireIds'}>
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
        <Form.Item name={'time'} rules={[{ required: true, message: '请选择时间' }]}>
          <RangePicker id={'time'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>添加</LongButton>
        </Form.Item>
      </Form>
    </Drawer>


    <Drawer
      title="修改任务"
      visible={isModifyModalVisible}
      onClose={closeModifyModal}
      width={'100%'}
    >
      <Form form={updateForm} onFinish={handleUpdateClick}>
        <Form.Item label={"任务ID"} name={'id'}>
          <Input aria-disabled disabled placeholder={'任务ID'} type="text" id={'id'} />
        </Form.Item>
        <Form.Item name={'taskName'} rules={[{ required: true, message: '请输入任务名' }]}>
          <Input placeholder={'任务名'} type="text" id={'taskName'} />
        </Form.Item>
        <Form.Item
          label={"测试组别"} name={'groupId'}>
          <Select
            id={'groupId'}
            // defaultValue={currentGroup?.id}
            style={{ width: 120 }}>
            {
              allGroups?.map((group: GroupItem) => <Option value={group.id}>{group.groupName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={'status'} rules={[{ required: true, message: '请选择状态' }]}>
          <Select
            id={'status'}
            style={{ width: 120 }}>
            <Option value={1}>已发布</Option>
            <Option value={0}>未发布</Option>
            <Option value={-1}>已过期</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={"任务内容"} name={'questionnaireIds'}>
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
        <Form.Item name={'time'} rules={[{ required: true, message: '请选择时间' }]}>
          <RangePicker id={'time'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>确定</LongButton>
        </Form.Item>
      </Form>
    </Drawer>
  </ScreenContainer >
}