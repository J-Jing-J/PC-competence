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

