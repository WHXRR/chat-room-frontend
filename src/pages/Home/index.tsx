import BGImage from '@/assets/images/bg.webp'
import LoginImage from '@/assets/images/login.webp'
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import type { FormInstance, FormProps } from 'antd';
import { login, registerCaptcha } from '@/interfaces/api';
import { useForm } from 'antd/es/form/Form';
import type { LoginFormValue } from '@/types/user';

function LoginForm({ onTypeChange }: { onTypeChange: (type: string) => void }) {
  return <>
    <Form.Item
      name="username"
      rules={[{ required: true, message: '请输入用户名!' }]}
    >
      <Input placeholder='用户名' />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[{ required: true, message: '请输入密码!' }]}
    >
      <Input.Password placeholder='密码' />
    </Form.Item>
    <Form.Item>
      <div className="flex justify-between">
        <Button type="link" className='!p-0' onClick={() => onTypeChange('register')}>创建账号</Button>
        <Button type="link" className='!p-0' onClick={() => onTypeChange('forget')}>忘记密码</Button>
      </div>
    </Form.Item>
    <Form.Item>
      <Button className='w-full' type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </>
}

function RegisterForm({ onTypeChange, form }: { onTypeChange: (type: string) => void; form: FormInstance }) {

  const getRegisterCaptcha = async () => {
    const email = form.getFieldValue('email')
    if (!email) {
      return message.error('请输入邮箱地址');
    }
    try {
      const res = await registerCaptcha(email);
      if (res.status === 201 || res.status === 200) {
        message.success('发送成功');
      }
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
    }
  }

  return <>
    <Form.Item
      name="username"
      rules={[{ required: true, message: '请输入用户名!' }]}
    >
      <Input placeholder='用户名' />
    </Form.Item>
    <Form.Item
      name="email"
      rules={[{ required: true, message: '请输入邮箱!' }]}
    >
      <Input placeholder='邮箱' />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: '请输入密码!' }]}
    >
      <Input.Password placeholder='密码' />
    </Form.Item>
    <Form.Item
      name="confirmPassword"
      rules={[{ required: true, message: '请输入确认密码!' }]}
    >
      <Input.Password placeholder='确认密码' />
    </Form.Item>
    <Form.Item
      name="captcha"
      rules={[{ required: true, message: '请输入验证码!' }]}
    >
      <div className="flex gap-4">
        <Input placeholder='验证码' />
        <Button type='primary' onClick={getRegisterCaptcha}>获取验证码</Button>
      </div>
    </Form.Item>
    <Form.Item>
      <Button type="link" className='!p-0' onClick={() => onTypeChange('login')}>返回登录</Button>
    </Form.Item>
    <Form.Item>
      <Button className='w-full' type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </>
}


export default function Home() {

  const [type, setType] = useState('login')
  const [form] = useForm();
  const onFinish: FormProps['onFinish'] = (values) => {
    if (type === 'login') {
      Login(values);
    }
  };

  const Login = async (values: LoginFormValue) => {
    try {
      const res = await login(values.username, values.password);
      if (res.status === 201 || res.status === 200) {
        message.success('登录成功');
        console.log(res.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
    }
  }

  return <div className='w-screen h-screen bg-cover bg-[#fbf7f4]' style={{ backgroundImage: `url(${BGImage})` }}>
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
              {type === 'forget' && 1}
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

}