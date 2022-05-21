import { Button, Dropdown, Space, Table, Tag } from "antd";
import { ScreenContainer } from "../../components/lib";
import { useUserTask } from "../../utils/user"

export const AllTestRecordScreen = () => {

  const columns = [
    {
      title: '序号',
      dataIndex: 'taskName',
      key: 'taskName',
    },
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