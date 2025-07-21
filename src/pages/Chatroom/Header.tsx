import { Avatar } from '@/components/Avatar'
import { getUserInfo, updateInfo } from '@/interfaces/api'
import useStore from '@/store'
import type { UpdateUserInfoType } from '@/types/user'
import getAllAvatar from '@/utils/getAllAvatar'
import { App, Button, Form, Input, Modal, type FormProps } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CatImage from '@/assets/images/cat.png'

export function Header() {
  const { message } = App.useApp()
  const { userInfo, updateUserInfo } = useStore()

  const [userConfigModal, setUserConfigModal] = useState(false)
  const handleOk = () => {}
  const handleCancel = () => {
    setUserConfigModal(false)
  }

  const avatars = getAllAvatar()
  const [form] = Form.useForm()
  const selectedAvatar = Form.useWatch('headPic', form)
  const selectAvatar = (avatar: { name: string; src: string }) => {
    form.setFieldsValue({ headPic: avatar.name })
  }

  const [loading, setLoading] = useState(false)
  const onFinish: FormProps['onFinish'] = async (
    values: UpdateUserInfoType,
  ) => {
    setLoading(true)

    try {
      const res = await updateInfo(values)
      if (res.status === 201 || res.status === 200) {
        message.success('修改成功')
        getInfo()
        setUserConfigModal(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const getInfo = async () => {
    const res = await getUserInfo()
    if (res.status === 201 || res.status === 200) {
      updateUserInfo({
        ...userInfo,
        ...res.data,
      })
      form.setFieldsValue({
        headPic: res.data.headPic,
        username: res.data.username,
      })
    }
  }
  useEffect(() => {
    getInfo()
  }, [])

  const navigate = useNavigate()
  const logout = () => {
    updateUserInfo({
      username: '',
      headPic: 'baimao',
      createTime: '',
      email: '',
      id: 0,
      token: '',
      updateTime: '',
    })
    navigate('/')
  }

  const catContainerRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (catContainerRef.current && catRef.current) {
      const containerWidth = catContainerRef.current.offsetWidth
      const catWidth = catRef.current.offsetWidth
      const distance = containerWidth - catWidth
      const speed = 100
      const duration = (distance * 2) / speed

      catRef.current.style.setProperty('--max-move', `${distance}px`)
      catRef.current.style.setProperty('--walk-duration', `${duration}s`)
    }
  }, [])

  return (
    <div className="flex justify-between">
      <div className="text-xl font-bold py-2">测试群聊</div>
      <div
        className="flex-1 mx-4 overflow-hidden self-end"
        ref={catContainerRef}
      >
        <img
          src={CatImage}
          alt="cat"
          className="w-10 md:w-20 cat"
          ref={catRef}
        />
      </div>
      <div
        className="flex items-center cursor-pointer py-2"
        onClick={() => setUserConfigModal(true)}
      >
        <Avatar
          headPic={userInfo.headPic ? userInfo.headPic : 'baimao'}
          className="w-7"
        />
        <div className="pl-2">{userInfo.username}</div>
        <svg
          className="w-5 h-5 ml-5 cursor-pointer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5537"
          width="128"
          height="128"
          onClick={logout}
        >
          <path
            d="M689.664 172.992l0 133.781333c89.28 58.176 148.394667 158.698667 148.394667 273.216 0 180.032-145.984 325.994667-326.058667 325.994667-180.032 0-326.016-145.962667-326.016-325.994667 0-101.781333 46.634667-192.618667 119.722667-252.437333L305.706667 186.773333C164.373333 261.098667 67.968 409.216 67.968 579.946667 67.968 825.173333 266.794667 1024 512.042667 1024c245.205333 0 443.989333-198.826667 443.989333-444.053333C956.010667 397.888 846.464 241.536 689.664 172.992z"
            fill="#231815"
            p-id="5538"
          ></path>
          <path
            d="M577.344 459.989333c0 28.693333-29.248 51.989333-65.344 51.989333l0 0c-36.053333 0-65.322667-23.274667-65.322667-51.989333L446.677333 51.989333C446.677333 23.274667 475.946667 0 512 0l0 0c36.096 0 65.344 23.274667 65.344 51.989333L577.344 459.989333z"
            fill="#231815"
            p-id="5539"
          ></path>
        </svg>
      </div>
      <Modal
        title="修改信息"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={userConfigModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="选择头像"
            name="headPic"
            rules={[{ required: true, message: '请选择你的头像' }]}
          >
            <div className="grid grid-cols-8 gap-3">
              {avatars.map((avatar) => (
                <div
                  className={`cursor-pointer rounded-full p-1 bg-transparent transition-all duration-300 ${selectedAvatar === avatar.name ? '!bg-red-100' : ''}`}
                  key={avatar.name}
                  onClick={() => selectAvatar(avatar)}
                >
                  <img src={avatar.src} alt={avatar.name} />
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入你的用户名' }]}
          >
            <Input className="!bg-transparent" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            确认
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
