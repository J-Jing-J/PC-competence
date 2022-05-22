import styled from "@emotion/styled";
import { Button, Card, List, Tag } from "antd";
import { ScreenContainer } from "../../components/lib"
import { useAuth } from "../../context/auth-context"

export const AdminDetailScreen = () => {
  // const { user } = useAuth();
  const user = JSON.parse(window.localStorage.getItem('admin') || '');


  const detailTags = [
    // adminNo: 20220313185037976
    // authorityId: 2
    {
      title: '用户名',
      content: user?.adminName
    },
    {
      title: '身份',
      content: user?.authorityId === 1 ? <Tag>超级管理员</Tag> :
        user?.authorityId === 2 ? <Tag>普通管理员</Tag> : <Tag>普通用户</Tag>
    },
    {
      title: '管理员ID',
      content: user?.adminId
    },
    {
      title: '管理员状态',
      content: user?.adminState === 1 ? '正常' : '停用'
    },
    {
      title: '组别',
      content: user?.adminGroup === 1 ? '默认分组' : '其他'
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