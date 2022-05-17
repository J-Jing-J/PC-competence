import Reacts, { FormEvent } from 'react';
import { Button, Form, Input } from 'antd'
import CryptoJs from 'crypto-js'
import { useAuth } from '../context/auth-context';
import { LongButton } from '.';
import { useAsync } from '../utils/use-async';

const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {

  // 不管在哪，只要调用了useAuth，都可以拿到user信息
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // 点击提交按钮
  const handleSubmit = ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    // 确认密码单独解构，因为不参与服务端的交互
    if (cpassword != values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    // event.preventDefault()
    // 浏览器的form标准：event.currentTarget.elements 里有所有input的信息
    // 默认会把event.currentTarget.elements[0]当成element类型，上面没有value
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;

    const tempPwd = CryptoJs.MD5(values.password).toString();

    const tempForm = {
      idNumber: values.username,
      password: values.password,
      userName: values.username
    }

    run(register(tempForm).catch((error) => onError(error)))
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'用户名'} type="text" id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{ required: true, message: '请输入用密码' }]}>
      <Input placeholder={'密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
      <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
    </Form.Item>
    <Form.Item name={'email'} >
      <Input placeholder={'邮箱（选填）'} type="email" id={'email'} />
    </Form.Item>
    <Form.Item name={'telephoneNumber'} >
      <Input placeholder={'手机号（选填）'} type="telephoneNumber" id={'telephoneNumber'} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}