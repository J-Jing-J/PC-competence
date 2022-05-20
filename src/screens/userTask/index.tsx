import { Button, Dropdown, Space, Table, Tag } from "antd";
import { ScreenContainer } from "../../components/lib";
import { useUserTask } from "../../utils/user"

export const UserTaskScreen = () => {
  const { isLoading, error, data } = useUserTask();
  const tasks = data?.list;

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (taskName: string) => <a>{taskName}</a>,
    },
    // questionnaireIdList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // questionnaireIds: "1,2,3,4,5,6,7,8,9"
    // questionnaireNameList: ["艾森克人格问卷量表", "主动性人格量表", "Frost多维度完美主义量表", "大五人格测验NEO-FFI量表", "卡特尔16种人格量表", "抑郁自测量表", "焦虑自测量表",…]
    // status: 1
    {
      title: '任务内容列表',
      dataIndex: 'taskContent',
      key: 'taskContent',
      render: (questionnaireNameList?: []) => (
        questionnaireNameList ? (
          <Dropdown
            overlay={
              <div>
                {questionnaireNameList?.map((questionnaire) => <span>{questionnaire}</span>)}
              </div>
            }></Dropdown>
        ) : '暂无数据'
      )
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime: string) => <span>{startTime}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime: string) => <span>{endTime}</span>,
    },
    {
      title: '完成状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: number) => (
        status === 1 ? (<Tag color="success">已完成</Tag>) :
          status === 0 ? (<Tag color="warning">未完成</Tag>) :
            (<Tag color="error">未识别状态</Tag>)
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (<Button>点击开始</Button>)
    },
  ];

  return <ScreenContainer>
    <Table columns={columns} dataSource={tasks} />
  </ScreenContainer>
}