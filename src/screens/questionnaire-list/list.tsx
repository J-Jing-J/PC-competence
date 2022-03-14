import { Table } from 'antd';
import React from 'react'
import dayjs from 'dayjs'
import { questionnaireType } from './search-panel';

// 展示出来的问卷列表
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
    columns={[
      {
        title: '问卷名称',
        dataIndex: 'title', //在对应的questionnair上读name属性
        sorter: (a, b) => a.title.localeCompare(b.title)  //localeCompare可以排序中文
      },
      {
        title: '说明',
        dataIndex: 'discription', //在对应的questionnair上读name属性
      },
      {
        title: '总分',
        dataIndex: 'fullScore', //在对应的questionnair上读name属性
      },
      {
        title: '问卷类型',
        render(value, questionnaire) {
          return <span>
            {questionnaireTypes.find(type => type.id === questionnaire.typeId)?.name || "未找到该类型"}
          </span>
        }
      },
      {
        title: '创建时间',
        render(value, questionnaire) {
          return <span>
            {
              questionnaire.createTime ? dayjs(questionnaire.createTime).format('YYYY-MM-DD') : '无'
            }
          </span>
        }
      },]}
    dataSource={displayedList}>
  </Table>
}