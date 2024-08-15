import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { updatePassword, updatePasswordCaptcha } from '../../interfaces'

export interface UpdatePasswordType {
  username: string
  email: string
  captcha: string
  password: string
  confirmPassword: string
}

export function UpdatePassword() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const getCaptcha = async () => {
    const address = form.getFieldValue('email')
    if (!address) {
      return message.error('请输入邮箱地址')
    }

    try {
      const res = await updatePasswordCaptcha(address)
      if (res.status === 201 || res.status === 200) {
        message.success('发送成功')
      }
    }
    catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }

  const onFinish = async (values: UpdatePasswordType) => {
    if (values.password !== values.confirmPassword) {
      return message.error('两次密码不一致')
    }
    try {
      const res = await updatePassword(values)

      if (res.status === 201 || res.status === 200) {
        message.success('密码修改成功')
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    }
    catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
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
          <Form.Item<UpdatePasswordType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UpdatePasswordType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<UpdatePasswordType>
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请输入确认密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<UpdatePasswordType>
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '邮箱格式不正确!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UpdatePasswordType> label="验证码">
            <div className="flex justify-between">
              <Form.Item<UpdatePasswordType>
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
              <Button type="link" className="p-0" onClick={() => navigate('/login')}>返回登录</Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit" className="w-full">
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
