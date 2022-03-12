import React from 'react'
import { useEffect, useState } from "react"

export const SearchPanel = ({ questionnaireTypes, inputContent, setInputContent }) => {



  // select选择框里要显示的的问卷类型


  return <form>
    <div>
      <input type="text" value={inputContent.title} onChange={evt => {
        setInputContent({
          ...inputContent,
          title: evt.target.value
        })
      }} />
      <select value={inputContent.id} onChange={evt => setInputContent({
        ...inputContent,
        id: evt.target.value
      })} >
        <option value={''}>问卷类型</option>
        {
          questionnaireTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
        }
      </select>
    </div>
  </form>
}