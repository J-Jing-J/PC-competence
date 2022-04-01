import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Select, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react"
import { ErrorBox } from "../../components/lib"
import { QuestionnaireTypeSelect } from "../../components/type-select"
import { useAddQuestionnaires, useEditQuestionnaires } from "../../utils/questionnaire"
import { useQuestionnaireModal, useQuestionnaireQueryKey } from "./util"


export const QuestionnaireModal = () => {
  const { questionnaireModalOpen, close, editingQuestionnaire, isLoading } = useQuestionnaireModal()
  const useMutateQuestionnaire = editingQuestionnaire ? useEditQuestionnaires : useAddQuestionnaires;
  // 选异步，因为要等结果返回再关闭窗口渲染结果
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateQuestionnaire(useQuestionnaireQueryKey());
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingQuestionnaire, ...values }).then(() => {
      form.resetFields();
      close();
    })
  }

  const title = editingQuestionnaire ? "编辑量表" : '创建量表'

  useEffect(() => {
    form.setFieldsValue(editingQuestionnaire)
  }, [editingQuestionnaire, form])


  return <Drawer
    forceRender={true}
    width={'100%'}
    visible={questionnaireModalOpen}
    onClose={close}
  >
    <Containner>
      {isLoading ? <Spin size={"large"} /> : <>
        <h1>{title}</h1>
        <ErrorBox error={error} />
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
            <Input placeholder="请输入量表名称" />
          </Form.Item>
          <Form.Item
            label={'类型'}
            name={'typeId'}
            rules={[{ required: true, message: '请选择量表类型' }]}
          >
            <QuestionnaireTypeSelect
              defaultOptionName={"请选择量表类型"}>
            </QuestionnaireTypeSelect>
          </Form.Item>
          <Form.Item
            label={'总分'}
            name={'fullScore'}
            rules={[{ required: true, message: '请输入总分' }]}
          >
            <Input placeholder="请输入总分" />
          </Form.Item>
          <Form.Item
            label={'问卷说明'}
            name={'discription'}
          >
            <Input placeholder="请输入问卷说明（选填）" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button
              loading={mutateLoading}
              type={'primary'}
              htmlType={"submit"}
            >提交</Button>
          </Form.Item>
        </Form>
      </>
      }
      <h1>Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Containner>
  </Drawer >
}

const Containner = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`