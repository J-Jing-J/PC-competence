import React from 'react'
import { Dropdown, Menu, Modal, Table } from 'antd';
import dayjs from 'dayjs'
import { TableProps } from 'antd/es/table'
import { questionnaireType } from './search-panel';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom'
import { Pin } from '../../components/pin';
import { useDeleteQuestionnaires, useEditQuestionnaires } from '../../utils/questionnaire';
import { ButtonNoPadding } from '../../components/lib';
import { useAuth } from '../../context/auth-context';
import { useQuestionnaireModal, useQuestionnaireQueryKey } from './util';
import { displayedListType } from '../../types/questionnaire'
import { useMemo } from 'react';




// 直接把父组件传的参数，透传到这里，直接在父组件里传dataSource属性
// TableProps代表Table组件的所有参数集合的类型
// ListProps包含TableProps<displayedListType> 和 questionnaireTypes
interface ListProps extends TableProps<displayedListType> {
  // displayedList: displayedListType[];
  questionnaireTypes: questionnaireType[],
  // questionnaireButton: JSX.Element
}

// { questionnaireTypes, ...props }取出questionnaireTypes，剩下的键值全放在props里
export const List = React.memo(({ questionnaireTypes, ...props }: ListProps) => {
  const { user } = useAuth()
  const { mutate } = useEditQuestionnaires(useQuestionnaireQueryKey())
  const pinQuestionnaire = (id: number) => (pin: boolean) => mutate({ id, pin });

  return <Table
    rowKey={"id"}
    loading
    pagination={false}
    columns={[
      {
        title: <Pin checked={true} disabled={true} />,
        render(value, questionnaire) {
          // 先得到questionnaire.id,当函数传入pin时，才得到pin  ----  函数柯里化
          return <Pin checked={questionnaire.pin} onCheckedChange={pinQuestionnaire(questionnaire.id)} />
        }
      },
      {
        title: '问卷名称',
        // dataIndex: 'title', //在对应的questionnair上读name属性
        sorter: (a, b) => a.title.localeCompare(b.title),  //localeCompare可以排序中文
        render(value, questionnaire) {
          // react-router-dom中的Link，to属性代表渲染路由的子路由
          return <Link to={String(questionnaire.id)}>{questionnaire.title}</Link>
        }
      },
      {
        title: '说明',
        dataIndex: 'description', //在对应的questionnair上读name属性
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
      },
      {
        render(value, questionnaire) {
          return <More questionnaire={questionnaire} />
        }
      }
    ]}
    // dataSource={displayedList}
    {...props}
  >
  </Table>
})

const More = ({ questionnaire }: { questionnaire: displayedListType }) => {
  const { user } = useAuth()
  const { startEdit } = useQuestionnaireModal();
  const editQuestionnaire = (id: number) => () => startEdit(id)
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaires(useQuestionnaireQueryKey())

  const confirmDeleteQuestionnaire = (id: number) => {
    Modal.confirm({
      title: `确定删除问卷“${questionnaire.title}”吗？`,
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk: () => deleteQuestionnaire({ id })
    })
  }
  return <Dropdown
    overlay={
      <Menu>
        {
          user?.identity === 1 ?
            <>
              <Menu.Item key={'edit'} onClick={editQuestionnaire(questionnaire.id)}>编辑</Menu.Item>
              <Menu.Item key={'delete'} onClick={() => confirmDeleteQuestionnaire(questionnaire.id)}>删除</Menu.Item>
            </>
            : null
        }
      </Menu>
    }>
    <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
  </Dropdown>
}