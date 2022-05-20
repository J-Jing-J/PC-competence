import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { cleanObject, useMount } from '.';
import * as auth from '../auth-provider'
import { http, useHttp } from '../utils/http';
import { tokenKey } from '../common/constants/storageKey';
import { User } from '../types/user'
// 使用firebase等auth服务就可以不写这个文件

const apiUrl = process.env.REACT_APP_API_URL

export const getEPQ = async () => {
  let data = null;
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  if (token) {
    // 如果有token，就携带在请求头里
    // 要判断token是否有效，所以不用useHttp，用http
    const data = await http('test/EPQ/getTest', { headers });
    // console.log(data.data);
  }
  return data;
}

// 获取Test列表
// export const useEPQ = () => {
//   const client = useHttp();
//   const { run, ...result } = useAsync()
//   const fetchEPQ = useCallback(() => client('test/EPQ/getTest'), [client])
//   useEffect(() => {
//     // client返回一个promise，而run需要接收一个promise
//     run(fetchEPQ(), { retry: fetchEPQ })
//   }, [run, fetchEPQ]);
//   console.log(result);
//   return result
// }


// export const useEPQ = () => {
//   const client = useHttp();
//   // const { run, ...result } = useAsync<displayedListType[]>()
//   // const fetchQuestionnaire = useCallback(() => client('questionnaires', { data: cleanObject(inputContent || {}) }), [client, inputContent])
//   // useEffect(() => {
//   //   // client返回一个promise，而run需要接收一个promise
//   //   run(fetchQuestionnaire(), { retry: fetchQuestionnaire })
//   // }, [inputContent, run, fetchQuestionnaire]);
//   // return result
//   return useQuery(['EPQTest'], () => client('EPQTest'))
// }

// 获取Test列表
export const useEPQ = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/EPQ/getTest'],
    () => client(
      'test/EPQ/getTest',
      { ...headers }
    )
  )
  return res
}

export const postEPQ = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/EPQ/submit`, {
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


export const usePPS = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/PPS/getTest'],
    () => client(
      'test/PPS/getTest',
      { ...headers }
    )
  )
  console.log(res);
  return res
}

export const postPPS = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/PPS/submit`, {
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

export const useFMPS = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/FMPS/getTest'],
    () => client(
      'test/FMPS/getTest',
      { ...headers }
    )
  )
  return res
}

export const postFMPS = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/FMPS/submit`, {
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




export const useNEOFFI = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/NEO-FFI/getTest'],
    () => client(
      'test/NEO-FFI/getTest',
      { ...headers }
    )
  )
  return res
}

export const postNEOFFI = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/NEO-FFI/submit`, {
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

export const usePF16 = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/16PF/getTest'],
    () => client(
      'test/16PF/getTest',
      { ...headers }
    )
  )
  return res
}

export const postPF16 = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/16PF/submit`, {
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

export const useSDS = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/SDS/getTest'],
    () => client(
      'test/SDS/getTest',
      { ...headers }
    )
  )
  return res
}

export const postSDS = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/SDS/submit`, {
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

export const useSAS = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/SAS/getTest'],
    () => client(
      'test/SAS/getTest',
      { ...headers }
    )
  )
  return res
}

export const postSAS = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/SAS/submit`, {
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


export const useBDI13 = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/BDI13/getTest'],
    () => client(
      'test/SAS/getTest',
      { ...headers }
    )
  )
  return res
}

export const postBDI13 = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/BDI13/submit`, {
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



export const usePSSS = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/PSSS/getTest'],
    () => client(
      'test/PSSS/getTest',
      { ...headers }
    )
  )
  return res;
}

export const postPSSS = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/PSSS/submit`, {
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


export const useSTAI = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/STAI/getTest'],
    () => client(
      'test/STAI/getTest',
      { ...headers }
    )
  )
  return res;
}

export const postSTAI = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/STAI/submit`, {
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


export const useSPM = () => {
  const client = useHttp();
  // 从localstorage里读token
  let token = JSON.parse(auth.getToken());
  const headers = { token };
  const res = useQuery(
    ['test/SPM/getTest'],
    () => client(
      'test/SPM/getTest',
      { ...headers }
    )
  )
  return res;
}

export const postSPM = (data: number[]) => {
  const token = JSON.parse(auth.getToken());
  return fetch(`${apiUrl}/test/SPM/submit`, {
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