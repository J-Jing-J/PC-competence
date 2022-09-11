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
export const addUser = (data: { userName: string, password: string }) => {
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

export const updateUser = (data: { userId: string, gender: number, userGroup: number }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json()
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



export const getUserDetailById = (userId: number) => {
  const token = JSON.parse(auth.getToken())
  const data: any = { id: userId }
  return fetch(`${apiUrl}/sys/user/findOneById?${qs.stringify(data)}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}


export const useAllGroup = () => {
  const client = useHttp();
  const res = useQuery(
    [`/sys/user/group/findAll`],
    () => client(
      `/sys/user/group/findAll`,
    )
  )
  console.log(res.data);
  return res;
}

export const useAllTest = () => {
  const client = useHttp();
  const res = useQuery(
    [`/sys/test/info/findAll`],
    () => client(
      `/sys/test/info/findAll`,
    )
  )
  console.log(res.data);
  return res;
}

export const updateGroup = (data: { id: number, groupName: string }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/user/group/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json()
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

export const addGroup = (data: { groupName: string }) => {
  const token = JSON.parse(auth.getToken())
  return fetch(`${apiUrl}/sys/user/group/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}


export const deleteGroup = (id: number) => {
  const token = JSON.parse(auth.getToken())
  return fetch(`${apiUrl}/sys/user/group/deleteById`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify({ id })
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}


export const addAdmin = (data: { adminName: string, password: string }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/admin/addAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}


export const addTask = (data: { groupId: number, questionnaireIds: [], status: number, taskName: string, startTime: string, endTime: string }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/task/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}

export const getTaskDetailById = (taskId: number) => {
  const token = JSON.parse(auth.getToken())
  const data: any = { id: taskId }
  return fetch(`${apiUrl}/sys/task/findOneById?${qs.stringify(data)}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}


export const updateTask = (data: { groupId: number, questionnaireIds: [], status: number, taskName: string, startTime: string, endTime: string }) => {
  const token = JSON.parse(auth.getToken())
  console.log(JSON.stringify(data));
  return fetch(`${apiUrl}/sys/task/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth': token
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      // 报错
      // Promise.reject()效果类似于throw new Errow
      return Promise.reject(await response.json())
    }
  })
}