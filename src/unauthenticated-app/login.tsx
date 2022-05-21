import { FormEvent } from 'react';
import { Button, Form, Input, Radio } from 'antd'
// import crypto from 'crypto' // 引用md5加密
import CryptoJs from 'crypto-js'
import { useAuth } from '../context/auth-context';
import { LongButton } from '.';
import { useAsync } from '../utils/use-async';


const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {

  // 不管在哪，只要调用了useAuth，都可以拿到user信息
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // 点击提交按钮
  const handleSubmit = (
    // event: FormEvent<HTMLFormElement>
    // 类型antd根据Form.Item的name推断
    values: { username: string, password: string, identity: number }
  ) => {
    const tempPwd = CryptoJs.MD5(values.password).toString();
    const tempForm = +values.identity === 1 ? ({
      idNumber: values.username,
      password: tempPwd
    }) : ({
      adminName: values.username,
      password: tempPwd
    })

    // event.preventDefault()
    // 浏览器的form标准：event.currentTarget.elements 里有所有input的信息
    // 默认会把event.currentTarget.elements[0]当成element类型，上面没有value
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    // login({ username, password })

    // run(login(values).catch((error) => onError(error)))
    run(login(tempForm, values.identity).catch((error) => onError(error)));
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
    <Form.Item name={'identity'} rules={[{ required: true, message: '请选择身份' }]}>
      <Radio.Group>
        <Radio.Button value={"1"}>普通用户</Radio.Button>
        <Radio.Button value={"2"}>管理员</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}