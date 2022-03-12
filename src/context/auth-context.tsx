import React, { ReactNode, useContext, useState } from 'react'
import * as auth from '../auth-provider'
import { User } from '../auth-provider'

interface AuthForm {
  username: string;
  password: string;
}

// React.createContext返回一个context对象
export const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

// React.ReactNode是组件的render函数的返回值
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useState使用泛型，和initialState类型相同
  // 如果不手动设置泛型，就不能把其他值setUser
  const [user, setUser] = useState<User | null>(null);

  // point free
  // (user) => setUser(user) 可以写成 setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // 当前context值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}


// 不管在哪，只要调用了useAuth，都可以拿到user信息(传入的{ user, login, register, logout })
export const useAuth = () => {
  // React.useContext返回一个context对象，并返回context的当前值
  // 当组件上层最近的<MyContext.Provider>更新时，该Hook会触发重渲染
  // 并使用最新传递给 MyContext provider 的 context value 值。
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context;
}