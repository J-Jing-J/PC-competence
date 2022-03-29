// 控制数据请求过程中的四种状态

import { useState } from "react";
import { useMountedRef } from ".";

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

  const mountedRef = useMountedRef();

  // 想要retry是函数类型，要多包一层，因为useState传函数是惰性加载的意思
  const [retry, setRetry] = useState(() => () => { })

  // run用来触发异步请求
  // promise是一个容器，包含D类型数据
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    // 如果使用者传入的不是promise或没传入
    if (!promise || !promise.then) {
      throw new Error('请传入Promise数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    // 当请求中。。
    setState({ ...state, stat: 'loading' })
    // 当异步请求返回结果
    return promise
      .then(data => {
        // 防止在卸载组件时赋值
        if (mountedRef.current) setData(data)
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
    // 刷新state
    retry,
    ...state
  }
}