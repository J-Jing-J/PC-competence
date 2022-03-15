import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// 整个项目根节点
// children:双节点中间的内容，相当于单节点上的children属性
// React.ReactNode是组件的render函数的返回值
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}