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
  return <table>
    <thead>
      <tr>
        <th>问卷名称</th>
        <th>问卷类型</th>
      </tr>
    </thead>
    <tbody>
      {
        displayedList.map(listItem => (<tr key={listItem.id}>
          <td>{listItem.title}</td>
          <td>{questionnaireTypes.find(type => type.id === listItem.typeId)?.name || "未找到该类型"}</td>
        </tr>))
      }
    </tbody>
  </table>
}