import qs from 'qs'
import { useCallback } from 'react';

import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

// 继承fetch第二个参数的类型，并扩展
interface ConfigRequestInit extends RequestInit {
  data?: object,
  token?: string,
}

// 通用的异步请求方法
// endPoint：网络端点
// 让配置项可以选填：加默认值
export const http = async (
  endPoint: string,
  { data, token, headers, ...customConfig }: ConfigRequestInit = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      // Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      // token: token ? token : null,
      ...headers
    },
    // 会覆盖上面的值，例如传入method:'POST'
    ...customConfig
  }

  // get：参数拼接在后面
  // post：参数放到body里
  if (config.method.toUpperCase() === 'GET') {

    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window
    .fetch(`${apiUrl}/${endPoint}`, config)
    .then(async response => {
      // 登陆失败或token过期
      if (response.status === 401) {
        // 登出
        await auth.logout();
        // 刷新页面
        window.location.reload();
        return Promise.reject({ message: '请重新登录' })
      }
      // 不是401
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        // 如果response.ok返回false，需要手动抛错，因为fetch和ajax不一样，只要服务器相应就算请求成功
        return Promise.reject(data)
      }
    })
}

// 自动携带JWT token
// 请求用useCarryTokene，而不是上面的http，就可以每次都自动把token放到body里
export const useHttp = () => {
  const { user } = useAuth();
  // Parameters<typeof http> ts操作符
  // Parameters是ts中的utility Types之一
  // typeof http静态检查时提取出http的类型（function）
  // Parameters传入函数类型，读出函数的参数类型
  return useCallback((...[endPoint, config]: Parameters<typeof http>) => {
    return http(endPoint, { ...config, token: user?.token })
  }, [user?.token])
}
