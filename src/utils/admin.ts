import { http, useHttp } from "./http";
import qs from 'qs'
import * as auth from '../auth-provider'
import { useQuery } from "react-query";
import { UserByPage } from "../types/admin";
const apiUrl = process.env.REACT_APP_API_URL;


export const useUserByPage = (pageIndex: number, pageSize: number) => {
  const data: Partial<UserByPage> = {
    pageIndex,
    pageSize
  }
  const client = useHttp();
  const res = useQuery(
    [`sys/user/findByPage?${qs.stringify(data)}`],
    () => client(
      `sys/user/findByPage?${qs.stringify(data)}`,
    )
  )
  console.log(res);
  return res;
}


// 接口暂不好用
export const addUser = (data: { idNumber: string, password: string, userName: string }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/user/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return auth.handleUserResponse(await response.json())
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

export const useGroupByPage = (pageIndex: number, pageSize: number) => {
  const data: Partial<UserByPage> = {
    pageIndex,
    pageSize
  }
  const client = useHttp();
  const res = useQuery(
    [`sys/user/group/findByPage?${qs.stringify(data)}`],
    () => client(
      `sys/user/group/findByPage?${qs.stringify(data)}`,
    )
  )
  console.log(res);
  return res;
}

export const useAdminByPage = (pageIndex: number, pageSize: number) => {
  const data: Partial<UserByPage> = {
    pageIndex,
    pageSize
  }
  const client = useHttp();
  const res = useQuery(
    [`sys/admin/findByPage?${qs.stringify(data)}`],
    () => client(
      `sys/admin/findByPage?${qs.stringify(data)}`,
    )
  )
  console.log(res);
  return res;
}


export const useTaskByPage = (pageIndex: number, pageSize: number) => {
  const data: Partial<UserByPage> = {
    pageIndex,
    pageSize
  }
  const client = useHttp();
  const res = useQuery(
    [`sys/task/findByPage?${qs.stringify(data)}`],
    () => client(
      `sys/task/findByPage?${qs.stringify(data)}`,
    )
  )
  console.log(res);
  return res;
}