// 控制数据请求过程中的四种状态

import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  // idle：闲置的，表示异步请求尚未发生
  // loding：异步请求正在发生
  // error/success：异步请求发生错误或成功执行
  stat: 'idle' | 'loading' | 'error' | 'success'
}

// 默认state
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

// 控制用State里的error，还是用promise抛出异常
const defaultConfig = {
  throwOnError: false
}


export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({ ...defaultInitialState, ...initialState })

  const config = { ...defaultConfig, initialConfig };

  // 请求成功了,调用setData
  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  // 请求失败了,调用setError
  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  // run用来触发异步请求
  // promise是一个容器，包含D类型数据
  const run = (promise: Promise<D>) => {
    // 如果使用者传入的不是promise或没传入
    if (!promise || !promise.then) {
      throw new Error('请传入Promise数据')
    }
    // 当请求中。。
    setState({ ...state, stat: 'loading' })
    // 当异步请求返回结果
    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        // catch会消化异常，如果不主动抛出，外面是接收不到异常的，用Promise.reject(error)抛出异常
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error
      })
  }

  return {
    // 给每一个状态返回一个标记
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}