import styled from "@emotion/styled";
import { Button, Card, List, Tag } from "antd";
import { ScreenContainer } from "../../components/lib"
import { useAuth } from "../../context/auth-context"

export const AccountDetailScreen = () => {
  const { user } = useAuth();

  const detailTags = [
    {
      title: '用户名',
      content: user?.userName
    },
    {
      title: '身份',
      content: user?.authorityId === 1 ? <Tag color={"gold"}>超级管理员</Tag> :
        user?.authorityId === 2 ? <Tag color={"geekblue"}>普通管理员</Tag> : <Tag color={"green"}>普通用户</Tag>
    },
    {
      title: '用户ID',
      content: user?.userId
    },
    {
      title: '性别',
      content: user?.gender === 0 ? '男' : '女'
    },
    {
      title: '组别',
      content: user?.groupName
    },
    {
      title: '分组',
      content: user?.userGroup
    }
  ]

  return <ScreenContainer>
    {/* {user?.data.userInfo.authorityId} */}
    <UserDetailContainer
      title="用户信息"
      extra={<Button type={'link'} href="#">修改信息</Button>}
    >
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={detailTags}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    </UserDetailContainer>
  </ScreenContainer>
}

const UserDetailContainer = styled(Card)`
  width: 100%;
  margin-top: 4rem;
`