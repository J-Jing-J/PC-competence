import React, { ReactNode, useContext, useState } from 'react'
import { useQueryClient } from 'react-query';
import * as auth from '../auth-provider'
import { User } from '../types/user'
import { FullPageErrorFallBack, FullPageLoading } from '../components/lib';
import { useMount } from '../utils';
import { http } from '../utils/http';
import { useAsync } from '../utils/use-async';

interface AuthForm {
  idNumber: string;
  password: string;
}

// 每次刷新页面都要判断token是否过期
// bootstrap：启动初始化
const bootstrapUser = async () => {
  let user = null;
  // 从localstorage里读token
  const token = auth.getToken();
  if (token) {
    // 如果有token，就携带在请求头里
    // 要判断token是否有效，所以不用useHttp，用http
    const data = await http('user/getUserInfo', { token });
    user = data;
    // user = data.user;
  }
  return user;
}

// React.createContext返回一个context对象
// export const AuthContext = React.createContext<{
//   user: User | null,
//   register: (form: AuthForm) => Promise<void>
//   login: (form: AuthForm) => Promise<void>
//   logout: () => Promise<void>
// } | undefined>(undefined)
// AuthContext.displayName = 'AuthContext'
const AuthContext = React.createContext<
  | {
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
  }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";



// React.ReactNode是组件的render函数的返回值
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useState使用泛型：initialState类型--默认值的类型
  // 如果不手动设置泛型，就不能把其他值setUser
  // const [user, setUser] = useState<User | null>(null);
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()
  // 拿到缓存
  const queryClient = useQueryClient()
  // point free
  // (user) => setUser(user) 可以写成 setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      // 登出时要清除缓存
      queryClient.clear()
    });

  // 页面加载时，就会执行AuthProvider，就会执行这个方法重置user
  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallBack error={error} />
  }
  // 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
  // 当前context值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}


// 不管在哪，只要调用了useAuth，都可以拿到user信息(传入的{ user, login, register, logout })
export const useAuth = () => {
  // React.useContext接受一个context对象本身，并返回context的当前值
  // 当组件上层最近的<MyContext.Provider>更新时，该Hook会触发重渲染
  // 并使用最新传递给 MyContext provider 的 context value 值。
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context;
}