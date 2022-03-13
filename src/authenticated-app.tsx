import { useAuth } from "./context/auth-context"
import { QuestionnaireListScreen } from "./screens/questionnaire-list"

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth()
  return <div>
    {
      user?.identity === 1 ? '我是管理员' : '我是普通用户'
    }
    <button onClick={logout}>登出</button>
    <QuestionnaireListScreen />
  </div>
}