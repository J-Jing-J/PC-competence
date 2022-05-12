import { Button, InputNumber, Form, Input, Select, Spin, Checkbox } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { TestTypeSelect } from "../../components/type-select";
import { useAddTest } from "../../utils/questionnaireEdit";
import { TestItemCard } from "../test/test-item";
import { useQuestionnaireIdInUrl, useTestQueryKey } from "../test/util";
import {
  CloseOutlined
} from '@ant-design/icons';
import styled from "@emotion/styled";

const { Option } = Select;

interface TestEditColumnProps {
  addType: number
}

export const CreateTest = (props: TestEditColumnProps) => {
  const { addType } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(0);
  const [score, setScore] = useState(0);
  // const [type, setType] = useState(0);
  const questionnaireId = useQuestionnaireIdInUrl();
  const { mutateAsync: addTest } = useAddTest(useTestQueryKey());

  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log(values);

    form.resetFields();
  }

  const Submit = async () => {
    await addTest({ questionnaireId, title, description, type, score });
    setTitle('');
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <TestItemCard>
      <Form
        style={{ width: '40rem' }}
        onFinish={onFinish}
        form={form}
        size={"small"}
        {...formItemLayout}
      >
        <Form.Item
          label={'名称'}
          name={'title'}
          rules={[{ required: true, message: '请输入问题名称' }]}
        // colon={false}
        >
          <Input
            placeholder={'新建问题名称'}
            onPressEnter={Submit}
            value={title}
            onChange={evt => setTitle(evt.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'备注'}
          name={'description'}
        >
          <Input
            placeholder={'新建问题描述/备注'}
            onPressEnter={Submit}
            value={description}
            onChange={evt => setDescription(evt.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'类型'}
          name={'typeId'}
          rules={[{ required: true, message: '请选择问题类型' }]}
        >
          <TestTypeSelect
            defaultOptionName={"请选择问题类型"}>
          </TestTypeSelect>
        </Form.Item>
        <Form.Item
          label={'分值'}
          name={'score'}
          rules={[{ required: true, message: '请输入分值' }]}
        >
          <Input placeholder="请输入分值" />
        </Form.Item>
        <Form.Item
          label={'是否必填'}
          name={'isRequired'}
        >
          <Checkbox checked>Checkbox</Checkbox>
        </Form.Item>
        <CustomTest addType={addType} />
        <Form.Item>
          <Button
            style={{ marginLeft: '30rem' }}
            size="large"
            type={'primary'}
            htmlType={"submit"}
          >提交</Button>
        </Form.Item>
      </Form>
    </TestItemCard>)
}



interface CustomTestProps {
  addType: number
}

const CustomTest = (props: CustomTestProps) => {
  const { addType } = props;
  return <>
    {
      addType === 0 ? (
        <>
          <Form.Item
            label={'量表类型'}
            name={'gaugeType'}
          >
            <Select defaultValue="0" style={{ width: 400 }}>
              <Option value="0">认同度</Option>
              <Option value="1">满意度</Option>
              <Option value="2">重要度</Option>
              <Option value="3">意愿度</Option>
              <Option value="4">符合度</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={'量表范围'}
            name={'gaugeType'}
          >
            <InputNumber min={1} max={100} defaultValue={5} />
          </Form.Item>
        </>
      ) : addType === 1 || addType === 2 || addType === 5 ? (
        <CreateOptions />
      ) : null
    }
  </>
}


const CreateOptions = () => {
  let [options, setOptions] = useState(['', '', '', ''])

  const addOption = () => {
    setOptions([...options, ''])
  }

  const deleteOption = (index: number) => {
    console.log(index);
    const newOptions = [...options];
    console.log(JSON.stringify(newOptions));
    newOptions.splice(index, 1);
    setOptions([...newOptions]);
  }

  return <>
    {
      options.map((option, index) => <Form.Item key={option}
        label={`选项${index + 1}`}
        name={'options'}
      >
        <InputFormItem>
          <Input defaultValue={option} placeholder="选项" />
          <CloseOutlined onClick={() => deleteOption(index)} style={{ marginLeft: '2rem' }} />
        </InputFormItem>
      </Form.Item>)
    }
    <Button style={{ marginLeft: '10rem' }} type='link' onClick={addOption}>添加选项</Button>
  </>
}

const InputFormItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

