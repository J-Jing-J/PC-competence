import { Table } from 'antd';
import React from 'react'
import { questionnaireType } from './search-panel';

interface displayedListType {
  id: string;
  title: string;
  discription: string;
  typeId: string;
  fullScore: string;
  pin: boolean;
  rank: string;
  creater: string;
  createTime: string;
  logo: string;
}

interface ListProps {
  displayedList: displayedListType[];
  questionnaireTypes: questionnaireType[]
}

export const List = ({ questionnaireTypes, displayedList }: ListProps) => {
  return <Table
    pagination={false}
    columns={[{
      title: '问卷名称',
      dataIndex: 'title', //在对应的questionnair上读name属性
      sorter: (a, b) => a.title.localeCompare(b.title)  //localeCompare可以排序中文
    }, {
      title: '问卷类型',
      render(value, questionnaire) {
        return <span>
          {questionnaireTypes.find(type => type.id === questionnaire.typeId)?.name || "未找到该类型"}
        </span>
      }
    }]}
    dataSource={displayedList}>
  </Table>
}