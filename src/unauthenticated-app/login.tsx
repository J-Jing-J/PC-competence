import { FormEvent } from 'react';
import { Button, Form, Input } from 'antd'
import { useAuth } from '../context/auth-context';
import { LongButton } from '.';


const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {

  // 不管在哪，只要调用了useAuth，都可以拿到user信息
  const { login, user } = useAuth();

  // 点击提交按钮
  const handleSubmit = (
    // event: FormEvent<HTMLFormElement>

    // 类型antd根据Form.Item的name推断
    values: { username: string, password: string }
  ) => {
    // event.preventDefault()
    // 浏览器的form标准：event.currentTarget.elements 里有所有input的信息
    // 默认会把event.currentTarget.elements[0]当成element类型，上面没有value
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    // login({ username, password })
    login(values)
  }

  // return <form onSubmit={handleSubmit}>
  //   <div>
  //     <label htmlFor='username'>用户名</label>
  //     <input type="text" id={'username'} />
  //   </div>
  //   <div>
  //     <label htmlFor='password'>密码</label>
  //     <input type="password" id={'password'} />
  //   </div>
  //   <button type={"submit"}>登录</button>
  // </form>

  return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'用户名'} type="text" id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={'submit'} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}