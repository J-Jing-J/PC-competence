import { useQuery } from 'react-query';
import * as auth from '../auth-provider'
import { useQuestionnaireIdInUrl } from '../screens/test/util';
import { http, useHttp } from './http';
const apiUrl = process.env.REACT_APP_API_URL

interface updatePasswordForm {
  oldPwd: string;
  newPwd: string;
}

export const updatePassword = (data: updatePasswordForm) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/user/updatePassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      // ok，返回user数据
      const res = await response.json();
      const status = res.status;
      console.log('status', status);
      return status;
    } else {
      return Promise.reject(await response.json())
    }
  })
}


export const useUserTask = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['user/getUserTask'],
    () => client(
      'user/getUserTask',
      { ...headers }
    )
  )
  return res
}


export const useTestRecord = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const questionnaireId = useQuestionnaireIdInUrl()
  const headers = { token };
  const res = useQuery(
    [`user/getTestRecord?testId=${questionnaireId}`],
    () => client(
      `user/getTestRecord?testId=${questionnaireId}`,
      { ...headers, }
    )
  )
  console.log(res);
  return res;
}

