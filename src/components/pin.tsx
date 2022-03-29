import React from 'react'
import { Rate } from 'antd'

interface pinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checkes: boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: pinProps) => {
  return <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={num => onCheckedChange?.(!!num)}
    {...restProps}
  />
}