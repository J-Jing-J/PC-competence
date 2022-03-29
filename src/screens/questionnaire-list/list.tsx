import { Dropdown, Menu, Table } from 'antd';
import dayjs from 'dayjs'
import { TableProps } from 'antd/es/table'
import { questionnaireType } from './search-panel';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom'
import { Pin } from '../../components/pin';
import { useEditQuestionnaires } from '../../utils/questionnaire';
import { ButtonNoPadding } from '../../components/lib';

// 展示出来的问卷列表
export interface displayedListType {
  id: number;
  title: string;
  discription: string;
  typeId: number;
  fullScore: string;
  pin: boolean;
  rank: string;
  creater: string;
  createTime: string;
  logo: string;
}

// 直接把父组件传的参数，透传到这里，直接在父组件里传dataSource属性
// TableProps代表Table组件的所有参数集合的类型
// ListProps包含TableProps<displayedListType> 和 questionnaireTypes
interface ListProps extends TableProps<displayedListType> {
  // displayedList: displayedListType[];
  questionnaireTypes: questionnaireType[],
  refresh?: () => void,
  setQuestionnaireModalOpen: (isOpen: boolean) => void
}

// { questionnaireTypes, ...props }取出questionnaireTypes，剩下的键值全放在props里
export const List = ({ questionnaireTypes, ...props }: ListProps) => {
  const { mutate } = useEditQuestionnaires()
  const pinQuestionnaire = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
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
      },
      {
        render(value, questionnaire) {
          return <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'edit'}>
                  <ButtonNoPadding type={'link'} onClick={() => { props.setQuestionnaireModalOpen(true) }}>编辑</ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }>
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        }
      }
    ]}
    // dataSource={displayedList}
    {...props}
  >
  </Table>
}