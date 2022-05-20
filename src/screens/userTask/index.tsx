import { ScreenContainer } from "../../components/lib";
import { useUserTask } from "../../utils/user"

export const UserTaskScreen = () => {
  const { isLoading, error, data } = useUserTask();
  const tasks = data?.data?.list;


  return <ScreenContainer>

  </ScreenContainer>
}