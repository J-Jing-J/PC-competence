import { http, useHttp } from "./http";
import qs from 'qs'
import * as auth from '../auth-provider'
import { useQuery } from "react-query";
import { UserByPage } from "../types/admin";

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


