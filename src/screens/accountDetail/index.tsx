import styled from "@emotion/styled";
import { Button, Card } from "antd";
import { ScreenContainer } from "../../components/lib"
import { useAuth } from "../../context/auth-context"

export const AccountDetailScreen = () => {
  // const { user } = useAuth();


  return <ScreenContainer>
    {/* {user?.data.userInfo.authorityId} */}
    <UserDetailContainer title="用户信息" extra={<Button type={'link'} href="#">修改信息</Button>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </UserDetailContainer>
  </ScreenContainer>
}

const UserDetailContainer = styled(Card)`
  width: 100%;
`