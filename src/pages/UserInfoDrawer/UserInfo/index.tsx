import { Button, Form, Input, Modal, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { getUserInfo, presignedUrl, updateUserInfo, updateUserInfoCaptcha } from '../../../interfaces'

export interface UserInfo {
  headPic: string
  nickName: string
  captcha: string
}

export function UserInfoModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    async function query() {
      const res = await getUserInfo()

      const { data } = res
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue('headPic', data.headPic)
        form.setFieldValue('nickName', data.nickName)
        setImageUrl(data.headPic)
      }
    }
    query()
  }, [])
  const handleChange: UploadProps['onChange'] = (info) => {
    console.log('customRequest', info)

    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(`http://localhost:9000/chat-room/${info.file.name}`)
      form.setFieldValue('headPic', `http://localhost:9000/chat-room/${info.file.name}`)
      message.success('上传成功')
    }
  }
  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-circle',
    className: 'avatar-uploader',
    showUploadList: false,
    action: async (file) => {
      const res = await presignedUrl(file.name)
      return res.data
    },
    customRequest: async (options) => {
      const { onSuccess, file, action } = options
      const res = await axios.put(action, file)
      onSuccess!(res.data)
    },
    onChange: handleChange,
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const getCaptcha = async () => {
    try {
      const res = await updateUserInfoCaptcha()
      if (res.status === 201 || res.status === 200) {
        message.success('发送成功')
      }
    }
    catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }

  const onFinish = async (values: UserInfo) => {
    try {
      const res = await updateUserInfo(values)
      if (res.status === 201 || res.status === 200) {
        message.success('用户信息更新成功')
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
          const info = JSON.parse(userInfo)
          info.headPic = values.headPic
          info.nickName = values.nickName

          localStorage.setItem('userInfo', JSON.stringify(info))
        }
      }
    }
    catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }
  return (
    <>
      <Modal title="Basic Modal" open={open} onOk={onClose} onCancel={onClose} footer={null} forceRender>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item<UserInfo>
            label=" "
            colon={false}
            name="headPic"
          >
            <div className="flex justify-center">
              <Upload {...uploadProps}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} className="rounded-full" /> : uploadButton}
              </Upload>
            </div>
          </Form.Item>
          <Form.Item<UserInfo>
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UserInfo> label="验证码">
            <div className="flex justify-between">
              <Form.Item<UserInfo>
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input />
              </Form.Item>
              <Button className="ml-2" type="primary" onClick={getCaptcha}>获取验证码</Button>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit" className="w-full">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
