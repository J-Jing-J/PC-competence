import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from '../utils/index';

// 返回页面url中，指定健的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // searchParams代表url中参数信息
  const [searchParams, setSearchParam] = useSearchParams();
  // console.log(searchParams.get('name'));

  return [
    // useMemo:只有在searchParams改变时，才进行这个运算
    useMemo(
      () => keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParam(o)
    }
    // setSearchParam
  ] as const

}