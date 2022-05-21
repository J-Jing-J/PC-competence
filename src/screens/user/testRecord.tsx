import React, { useState } from 'react'
import { ScreenContainer } from '../../components/lib'
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { useTestRecord } from "../../utils/user"

export const TestRecordScreen = () => {
  const { isLoading, error, data } = useTestRecord();
  const record = data?.record;

  const columns = [
    {
      title: '序号',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (taskName: string) => <span>{taskName}</span>,
    },
    {
      title: '内外向分数',
      dataIndex: 'factorE',
      key: 'factorE',
      render: (factorE: number) => <span>{factorE}</span>,
    },
    {
      title: '掩饰质分数',
      dataIndex: 'factorL',
      key: 'factorL',
      render: (factorL: number) => <span>{factorL}</span>,
    },
    {
      title: '神经质分数',
      dataIndex: 'factorN',
      key: 'factorN',
      render: (factorN: number) => <span>{factorN}</span>,
    },
    {
      title: '精神质分数',
      dataIndex: 'factorP',
      key: 'factorP',
      render: (factorP: number) => <span>{factorP}</span>,
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => <span>{createTime}</span>,
    },
    // {
    //   title: '综合结果',
    //   key: 'result',
    //   dataIndex: 'result',
    //   render: (factorE: number, factorL: number, factorN: number, factorP: number) => (
    //     <Tag color="success">不典型</Tag>
    //     // factorE + factorL + factorN + factorP >= 38.5 && factorE + factorL + factorN + factorP <= 61.5 ?
    //     //   (<Tag color="success">不典型</Tag>) :
    //     //   factorE + factorL + factorN + factorP >= 43.3 && factorE + factorL + factorN + factorP <= 56.7 ?
    //     //     (<Tag color="success">平衡型</Tag>) :
    //     //     (<Tag color="success">典型型</Tag>)
    //   ),
    // },
  ];

  return <ScreenContainer>
    <Table columns={columns} dataSource={record} />
  </ScreenContainer>
}