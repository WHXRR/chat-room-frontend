import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '../../interfaces'

interface LoginUser {
  username: string
  password: string
}
export function Login() {
  const navigate = useNavigate()

  const onFinish = async (values: LoginUser) => {
    try {
      const res = await login(values.username, values.password)
      if (res.status === 201 || res.status === 200) {
        message.success('登录成功')
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    }
    catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mt-4 w-full max-w-[400px]">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginUser>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginUser>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 20 }}
          >
            <div className="flex justify-between">
              <Button type="link" className="p-0" onClick={() => navigate('/register')}>创建账号</Button>
              <Button type="link" className="p-0" onClick={() => navigate('/update_password')}>忘记密码</Button>
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
