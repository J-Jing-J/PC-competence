import React from 'react'

export const List = ({ questionnaireTypes, displayedList }) => {
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