import { User } from './types/user'
// 使用firebase等auth服务就可以不写这个文件

const apiUrl = process.env.REACT_APP_API_URL



const localStorageKey = '__auth_provider_token__'

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  // 当返回的token为undefined时，给一个空字符串
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      // ok，返回user数据
      return handleUserResponse(await response.json())
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

// 加async才可以返回promise
export const logout = async () => window.localStorage.removeItem(localStorageKey);
