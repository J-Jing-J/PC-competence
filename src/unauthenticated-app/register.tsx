import Reacts, { FormEvent } from 'react';
import { Button, Form, Input } from 'antd'

import { useAuth } from '../context/auth-context';
import { LongButton } from '.';

const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = () => {

  // 不管在哪，只要调用了useAuth，都可以拿到user信息
  const { register, user } = useAuth();

  // 点击提交按钮
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // 浏览器的form标准：event.currentTarget.elements 里有所有input的信息
    // 默认会把event.currentTarget.elements[0]当成element类型，上面没有value
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password })
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'用户名'} type="text" id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'确认密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item name={'password'} >
      <Input placeholder={'邮箱'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item name={'password'} >
      <Input placeholder={'手机号'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={'submit'} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}