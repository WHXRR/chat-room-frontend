import {
  createGroup,
  getNotJoinedChatroomList,
  getJoinedChatroomList,
} from '@/interfaces/api'
import type { Chatroom } from '@/types/chat'
import { Button, Form, Input, message, Modal, type FormProps } from 'antd'
import { useEffect, useState } from 'react'
import { ChatroomBox } from './components/ChatroomBox'

export function ChatroomList() {
  const [notJoinedList, setNotJoinedList] = useState<Chatroom[]>([])
  const [joinedList, setJoinedList] = useState<Chatroom[]>([])
  const getList = async () => {
    try {
      const res1 = await getNotJoinedChatroomList()
      setNotJoinedList(res1.data)
      const res2 = await getJoinedChatroomList()
      setJoinedList(res2.data)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const [groupModel, setGroupModel] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish: FormProps['onFinish'] = async (values: { name: string }) => {
    setLoading(true)
    try {
      const res = await createGroup(values.name)
      if (res.status === 200 || res.status === 201) {
        message.success('创建成功')
        setGroupModel(false)
        getList()
      }
    } catch (e) {
      console.warn(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="p-4">
      <div className="pb-10">
        <div className="pb-2 font-bold">已加入的群聊</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
          {joinedList.map((item) => (
            <ChatroomBox key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="pb-2 font-bold">未加入的群聊</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {notJoinedList.map((item) => (
          <ChatroomBox key={item.id} {...item} />
        ))}
        <div
          className="border border-gray-300 cursor-pointer rounded-lg px-2 py-4 flex items-center justify-center"
          onClick={() => setGroupModel(true)}
        >
          <svg
            className="w-5 text-gray-400"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4956"
            fill="currentColor"
          >
            <path
              d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z"
              p-id="4957"
            ></path>
          </svg>
        </div>
      </div>
      <Modal
        title="创建群聊"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={groupModel}
        onCancel={() => setGroupModel(false)}
        footer={null}
      >
        <Form
          form={form}
          colon={false}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入群聊名称' }]}
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
