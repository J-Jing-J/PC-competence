import { Button, Dropdown, Space, Table, Tag } from "antd";
import { ScreenContainer } from "../../components/lib";
import { useUserTask } from "../../utils/user"

export const TestRecordScreen = () => {

  const columns = [
    {
      title: '序号',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    // questionnaireIdList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // questionnaireIds: "1,2,3,4,5,6,7,8,9"
    // questionnaireNameList: ["艾森克人格问卷量表", "主动性人格量表", "Frost多维度完美主义量表", "大五人格测验NEO-FFI量表", "卡特尔16种人格量表", "抑郁自测量表", "焦虑自测量表",…]
    // status: 1
    {
      title: '测试日期',
      dataIndex: 'taskContent',
      key: 'taskContent',
    },
    {
      title: '操作',
      dataIndex: 'startTime',
      key: 'startTime',
    },
  ];

  return <ScreenContainer>
    <Table
      columns={columns}
    // dataSource={tasks}
    />
  </ScreenContainer>
}