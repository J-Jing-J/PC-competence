import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL

interface updatePasswordForm {
  oldPwd: string;
  newPwd: string;
}

export const updatePassword = (data: updatePasswordForm) => {
  const token = JSON.parse(auth.getToken());
  console.log(JSON.stringify(data));
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