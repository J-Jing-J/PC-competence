import { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from '../utils/index';

// 返回页面url中，指定健的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    // useMemo:只有在searchParams改变时，才进行这个运算
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    },
  ] as const;
};

// 设置url参数
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  // 使他可以接受所有key，只要是字符串就可以
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};