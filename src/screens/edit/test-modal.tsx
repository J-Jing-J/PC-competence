import { Button, Checkbox, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react";
import { useEditTest } from "../../utils/questionnaireEdit";
import { useTestQueryKey } from "../test/util";
import { useEditTestModal } from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTestId, editingTest, close, } = useEditTestModal();
  const { mutateAsync: editTest, isLoading: editLoading } = useEditTest(useTestQueryKey())

  const onCancel = () => {
    close();
    form.resetFields();
  }

  const onOk = async () => {
    close();
    await editTest({ ...editingTest, ...form.getFieldsValue() });
  }

  useEffect(() => {
    form.setFieldsValue(editingTest)
  }, [form, editingTest])

  return <Modal
    okText={'确认'}
    cancelText={'取消'}
    confirmLoading={editLoading}
    title={'编辑任务'}
    visible={!!editingTestId}
    onCancel={onCancel}
    onOk={onOk}
  >
    <Form
      initialValues={editingTest}
      form={form}
      {...layout}
    >
      <Form.Item
        label={'问题名称'}
        name={'title'}
        rules={[{ required: true, message: '请输入问题名称' }]}
      >
        <Input
          placeholder={'问题名称'}
          autoFocus={true}
        // value={title}
        // onChange={evt => setTitle(evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label={'备注'}
        name={'description'}
      >
        <Input
          placeholder={'新建问题描述/备注'}
        // value={description}
        // onChange={evt => setDescription(evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label={'分值'}
        name={'score'}
      >
        <InputNumber
          min={1}
          max={100}
          defaultValue={10}
        // onChange={value => setScore(value)}
        />
      </Form.Item>
      <Form.Item
        label={'是否必填'}
        name={'isRequired'}
      >
        <Checkbox
        // checked={isRequired}
        // onChange={evt => setIsRequired(evt.target.value)}
        />
      </Form.Item>
    </Form>
  </Modal >
}