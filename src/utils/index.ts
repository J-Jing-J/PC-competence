import { useEffect, useState } from "react"

// 值为0也应该是有效值
export const isFalsy = (value: unknown) => value === 0 ? false : !value


// 清除空对象
// 例如搜索携带的空input参数

// obj: object，object类型会被认为是空对象，因为func是对象，可以返回空对象
// export const cleanObject = (obj: object) => {
export const cleanObject = (obj: { [key: string]: unknown }) => {
  // 最好不要改变函数内的对象本身
  // Object.assign({}, obj);
  const result = { ...obj };
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  })
  return result;
}

// 判断值是否是无意义的
// 如果传入{check：false}，会判断为有意义，但其实是想删除
export const isVoid = (value: unknown) =>
  value === undefined ||
  value === null ||
  value === ''

// 在页面加载时执行
// 替代依赖项为空数组的useEffect
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖项里加上callback会造成无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}


// 连续输入或点击后，经过一定时间才发送请求
// value变化时，过delay时间后，使debouncedValue变化，界面可监听debouncedValue发送请求
// 需要用useState检测value的改变，所以自定义hook
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次value变化时，设置一个定时器
    const timeOut = setTimeout(() => setDebouncedValue(value), delay)
    // 组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除
    // 下一次清除上一次的定时器
    // 最后一个定时器在组件卸载时清除
    return () => clearTimeout(timeOut);
  }, [value, delay])
  return debouncedValue
}



