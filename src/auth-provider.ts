import { tokenKey } from './common/constants/storageKey';
import { AdminLoginForm, UserLoginForm } from './context/auth-context';
import { User } from './types/user'
// 使用firebase等auth服务就可以不写这个文件

const apiUrl = process.env.REACT_APP_API_URL

// 获取token
export const getToken = () => JSON.stringify(window.localStorage.getItem(tokenKey));

export const handleUserResponse = ({ user, token }: { user: User, token: string }) => {
  // 当返回的token为undefined时，给一个空字符串
  console.log(token);
  console.log(user)
  window.localStorage.setItem(tokenKey, token || '');
  window.localStorage.setItem('user', JSON.stringify(user) || '');
  window.localStorage.removeItem('admin');
  if (user) {
    window.location.pathname = '/home'
  }
  return user;
}

export const handleAdminResponse = ({ auth, admin }: { admin: User, auth: string }) => {
  // 当返回的token为undefined时，给一个空字符串
  console.log(auth);
  console.log(admin)
  window.localStorage.setItem(tokenKey, auth || '');
  window.localStorage.setItem('admin', JSON.stringify(admin) || '');
  window.localStorage.removeItem('user');
  if (admin) {
    window.location.pathname = '/admin'
  }
  return admin;
}



export const login = (data: UserLoginForm | AdminLoginForm, identity: number) => {
  console.log(identity);
  const loginUrl = +identity === 1 ? '/user/login' : '/sys/admin/login';
  return fetch(`${apiUrl}${loginUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      // ok，返回user数据
      const res = await response.json();
      console.log('res', res);
      if (+identity === 1) {
        return handleUserResponse(res.data);
      } else {
        return handleAdminResponse(res.data)
      }
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}



export const register = (data: { userName: string, password: string, idNumber: string}) => {
  return fetch(`${apiUrl}/user/reg`, {
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
export const logout = async () => {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem('admin');
  window.localStorage.removeItem('user');
  window.location.pathname = '/login'
}
