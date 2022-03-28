import { Select } from 'antd'
import React from 'react'
import { Raw } from '../types'

// Select组件上的所有参数类型
type SelectProps = React.ComponentProps<typeof Select>

// 可以让参数接收Select组件的所有参数，自定义属性
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined,
  onChange: (value?: number) => void,
  defaultOptionName?: string,
  options?: { title: string, id: number }[]
}

// 使select传入的id不管是什么类型，都转换为number
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return <Select
    value={toNumber(value)}
    // toNumber如果是0，那就传入undefined
    onChange={value => onChange(toNumber(value) || undefined)}
    {...restProps}
  >
    {
      // toNumber会把其他值都转为0，都匹配到defaultOptionName上
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(option => <Select.Option key={option.id} value={option.id}>{option.title}</Select.Option>)
    }
  </Select>
}


// 将值转换为number类型
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value) 