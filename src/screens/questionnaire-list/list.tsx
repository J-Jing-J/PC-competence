import { Table } from 'antd';
import dayjs from 'dayjs'
import { TableProps } from 'antd/es/table'
import { questionnaireType } from './search-panel';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom'

// 展示出来的问卷列表
export interface displayedListType {
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

// 直接把父组件传的参数，透传到这里，直接在父组件里传dataSource属性
// TableProps代表Table组件的所有参数集合的类型
// ListProps包含TableProps<displayedListType> 和 questionnaireTypes
interface ListProps extends TableProps<displayedListType> {
  // displayedList: displayedListType[];
  questionnaireTypes: questionnaireType[]
}

// { questionnaireTypes, ...props }取出questionnaireTypes，剩下的键值全放在props里
export const List = ({ questionnaireTypes, ...props }: ListProps) => {
  return <Table
    rowKey={"id"}
    loading
    pagination={false}
    columns={[
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
      },]}
    // dataSource={displayedList}
    {...props}
  >
  </Table>
}