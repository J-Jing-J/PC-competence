import * as auth from '../auth-provider'
import { http } from '../utils/http';

export const getEPQ = async () => {
  let data = null;
  // 从localstorage里读token
  const token = auth.getToken();
  const headers = {
    token: JSON.stringify(window.localStorage.getItem('__auth_provider_token__'))
  }
  if (token) {
    // 如果有token，就携带在请求头里
    // 要判断token是否有效，所以不用useHttp，用http
    const data = await http('test/EPQ/getTest', { token });
    console.log(data);
  }
  return data;
}
