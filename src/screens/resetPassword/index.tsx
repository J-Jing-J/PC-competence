import Reacts, { FormEvent } from 'react';
import { Button, Form, Input, message } from 'antd'
import CryptoJs from 'crypto-js'
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../utils/use-async';
import { LongButton } from '../../unauthenticated-app';
import { updatePassword } from '../../utils/user';
import { ErrorBox, ScreenContainer } from '../../components/lib';
import { useForm } from 'antd/es/form/Form';
import styled from '@emotion/styled';

export const ResetPasswordScreen = () => {

  const [form] = useForm();
  const { logout } = useAuth();

  // 不管在哪，只要调用了useAuth，都可以拿到user信息
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // 点击提交按钮
  const handleSubmit = async (values: { oldPassword: string, newPassword: string, cpassword: string } | any) => {
    form.resetFields();
    let status;
    if (values.cpassword !== values.newPassword) {
      message.error("请输入两次相同的密码");
      return
    }

    const tempOldPwd = CryptoJs.MD5(values.oldPassword).toString();
    const tempNewPwd = CryptoJs.MD5(values.newPassword).toString();

    const tempForm = {
      oldPwd: tempOldPwd,
      newPwd: tempNewPwd,
    }
    status = await updatePassword(tempForm);
    if (status) {
      message.success('修改成功，3秒后跳转登录界面');
      setTimeout(() => {
        logout();
      }, 1000);
    } else {
      message.warning('修改失败，请检查输入的密码是否正确');
    }
  }

  return <ScreenContainer>
    <FormContainer>
      <Title>胜任力系统</Title>
      <ErrorBox />
      <UpdatePasswordForm
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 30 }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item label={'旧密码'} name={'oldPassword'} rules={[{ required: true, message: '请输入旧密码' }]}>
          <Input placeholder={'旧密码'} type="password" id={'oldPassword'} />
        </Form.Item>
        <Form.Item label={'新密码'} name={'newPassword'} rules={[{ required: true, message: '请输入新密码' }]}>
          <Input placeholder={'新密码'} type="password" id={'newPassword'} />
        </Form.Item>
        <Form.Item label={'确认新密码'} name={'cpassword'} rules={[{ required: true, message: '请确认新密码' }]}>
          <Input placeholder={'确认新密码'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>确认修改</LongButton>
        </Form.Item>
      </UpdatePasswordForm>
    </FormContainer>
  </ScreenContainer>
}


const FormContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const UpdatePasswordForm = styled(Form)`
`

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #EB4889;
`