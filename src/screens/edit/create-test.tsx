import { Button, InputNumber, Form, Input, Select, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { TestTypeSelect } from "../../components/type-select";
import { useAddTest } from "../../utils/questionnaireEdit";
import { TestItemCard } from "../test/test-item";
import { useQuestionnaireIdInUrl, useTestQueryKey } from "../test/util";

const { Option } = Select;

export const CreateTest = () => {
  const [title, setTitle] = useState('');
  const questionnaireId = useQuestionnaireIdInUrl();
  const { mutateAsync: addTest } = useAddTest(useTestQueryKey());

  const [form] = useForm();

  const onFinish = (values: any) => {
    form.resetFields();
  }

  const Submit = async () => {
    await addTest({ title, questionnaireId });
    setTitle('');
  }

  return (

    <TestItemCard>
      <Form
        layout={"vertical"}
        style={{ width: '40rem' }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label={'名称'}
          name={'title'}
          rules={[{ required: true, message: '请输入量表名' }]}
        >
          <Input
            size={"large"}
            placeholder={'新建问题名称'}
            onPressEnter={Submit}
            value={title}
            onChange={evt => setTitle(evt.target.value)}
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
          name={'fullScore'}
          rules={[{ required: true, message: '请输入分值' }]}
        >
          <Input placeholder="请输入分值" />
        </Form.Item>
        <Form.Item
          label={'问题说明'}
          name={'discription'}
        >
          <Input placeholder="请输入问题说明" />
        </Form.Item>
        <Select defaultValue="0" style={{ width: 400 }}>
          <Option value="0">认同度</Option>
          <Option value="1">满意度</Option>
          <Option value="2">重要度</Option>
          <Option value="3">意愿度</Option>
          <Option value="4">符合度</Option>
        </Select>
        <InputNumber min={1} max={100} defaultValue={5} />
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            // loading={mutateLoading}
            type={'primary'}
            htmlType={"submit"}
          >提交</Button>
        </Form.Item>
      </Form>
    </TestItemCard>)
}