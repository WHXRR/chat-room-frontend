import LoginImage from '@/assets/images/login.webp'
import { App, Form } from 'antd';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { login, register, updatePassword } from '@/interfaces/api';
import { useForm } from 'antd/es/form/Form';
import type { LoginFormValue, RegisterUser, UpdatePassword } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgetPasswordForm } from './ForgetPasswordForm';

export default function Home() {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const [type, setType] = useState('login')
  const [form] = useForm();
  const onFinish: FormProps['onFinish'] = (values) => {
    if (type === 'login') {
      userLogin(values);
    } else if (type === 'register') {
      userRegister(values);
    } else if (type === 'forget') {
      userUpdatePassword(values)
    }
  };

  const userLogin = async (values: LoginFormValue) => {
    try {
      const res = await login(values);
      if (res.status === 201 || res.status === 200) {
        message.success('登录成功');
        setTimeout(() => {
          navigate('/chatroom');
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
    }
  }

  const userRegister = async (values: RegisterUser) => {
    try {
      if (values.password !== values.confirmPassword) return message.warning('两次密码不一致');
      const res = await register(values);
      if (res.status === 201 || res.status === 200) {
        message.success('注册成功');
        userLogin({
          email: values.email,
          password: values.password,
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
    }
  }

  const userUpdatePassword = async (values: UpdatePassword) => {
    try {
      if (values.password !== values.confirmPassword) return message.warning('两次密码不一致');
      const res = await updatePassword(values);
      if (res.status === 201 || res.status === 200) {
        message.success('修改成功');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
    }
  }

  return <div className='w-screen h-screen'>
    <div className='container flex items-center justify-center px-5 mx-auto h-full'>
      <div className="flex-1 flex md:items-center gap-10 flex-col md:flex-row">
        <div className='w-full md:w-[60%]'>
          <div className='text-2xl md:text-3xl font-bold pb-3'>魔域爽</div>
          <div className="text-sm pb-10 text-[#6a676b]">Ctrl+C 是工作，Ctrl+V 是生活，Alt+Tab 是信仰～</div>
          <img src={LoginImage} alt="login" />
        </div>
        <div className='flex-1 flex justify-end'>
          <div className='flex-1 max-w-[400px]'>
            <Form
              form={form}
              colon={false}
              autoComplete="off"
              size='large'
              onFinish={onFinish}
              className='home-form'
            >
              {type === 'login' && <LoginForm onTypeChange={(type: string) => setType(type)} />}
              {type === 'register' && <RegisterForm onTypeChange={(type: string) => setType(type)} form={form} />}
              {type === 'forget' && <ForgetPasswordForm onTypeChange={(type: string) => setType(type)} form={form} />}
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
} 