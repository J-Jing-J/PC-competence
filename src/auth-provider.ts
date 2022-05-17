import { tokenKey } from './common/constants/storageKey';
import { User } from './types/user'
// 使用firebase等auth服务就可以不写这个文件

const apiUrl = process.env.REACT_APP_API_URL

// 获取token
export const getToken = () => JSON.stringify(window.localStorage.getItem(tokenKey));

export const handleUserResponse = ({ user, token }: { user: User, token: string }) => {
  // 当返回的token为undefined时，给一个空字符串
  console.log(token);
  console.log(user)

  window.localStorage.setItem(tokenKey, token || '')
  return user
}

export const login = (data: { idNumber: string, password: string }) => {
  return fetch(`${apiUrl}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      // ok，返回user数据
      const res = await response.json();
      console.log(res);
      return handleUserResponse(res.data)
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { idNumber: string, password: string }) => {
  return fetch(`${apiUrl}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
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
export const logout = async () => window.localStorage.removeItem(tokenKey);
