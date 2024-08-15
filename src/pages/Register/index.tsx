import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { register, registerCaptcha } from '../../interfaces'

export interface RegisterUser {
  username: string
  nickName: string
  password: string
  confirmPassword: string
  email: string
  captcha: string
}

export function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const getCaptcha = async () => {
    const address = form.getFieldValue('email')
    if (!address) {
      return message.error('请输入邮箱')
    }
    const res = await registerCaptcha(address)
    if ([200, 201].includes(res.status)) {
      message.success('发送成功')
    }
    else {
      message.error(res.data.data)
    }
  }

  const onFinish = async (values: RegisterUser) => {
    if (values.password !== values.confirmPassword) {
      return message.error('两次密码不一致')
    }
    const res = await register(values)
    const { data } = res.data
    if ([200, 201].includes(res.status)) {
      message.success('注册成功')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
    else {
      message.error(data || '注册失败')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mt-6 w-full max-w-[400px]">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item<RegisterUser>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterUser>
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<RegisterUser>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<RegisterUser>
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请输入确认密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<RegisterUser>
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '邮箱格式不正确!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterUser> label="验证码">
            <div className="flex justify-between">
              <Form.Item<RegisterUser>
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input />
              </Form.Item>
              <Button className="ml-2" type="primary" onClick={getCaptcha}>获取验证码</Button>
            </div>
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 20 }}
          >
            <div className="flex justify-between">
              <Button type="link" className="p-0"></Button>
              <Button type="link" className="p-0" onClick={() => navigate('/login')}>已有账号？去登录</Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
