import { Button, Form, Input } from 'antd'

export function LoginForm({
  onTypeChange,
}: {
  onTypeChange: (type: string) => void
}) {
  return (
    <>
      <Form.Item
        name="email"
        rules={[{ required: true, message: '请输入邮箱!' }]}
      >
        <Input placeholder="邮箱" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Button
            type="link"
            className="!p-0"
            onClick={() => onTypeChange('register')}
          >
            创建账号
          </Button>
          <Button
            type="link"
            className="!p-0"
            onClick={() => onTypeChange('forget')}
          >
            忘记密码
          </Button>
        </div>
      </Form.Item>
      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </>
  )
}
