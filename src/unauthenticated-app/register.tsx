import Reacts, { FormEvent } from 'react';
import { useAuth } from '../context/auth-context';

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

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor='username'>用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor='password'>密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={"submit"}>注册</button>
  </form>
}