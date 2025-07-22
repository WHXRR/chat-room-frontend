import { ChatBox } from '@/components/ChatBox'
import { SocketContext } from '@/context/SocketContext'
import { getHistoryMessage } from '@/interfaces/api'
import type { HistoryMessage, JoinRoom, SendMessage } from '@/types/chat'
import { message } from 'antd'
import { useContext, useEffect, useState } from 'react'

export function ChatList() {
  const [historyMessageList, setHistoryMessageList] = useState<
    Array<HistoryMessage>
  >([])
  const socket = useContext(SocketContext)

  const getChatHistory = async () => {
    try {
      const res = await getHistoryMessage(1)

      if (res.status === 201 || res.status === 200) {
        setHistoryMessageList(res.data)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.warning(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }

  const [messageList, setMessageList] = useState<Array<SendMessage | JoinRoom>>(
    [],
  )
  useEffect(() => {
    getChatHistory()
    if (socket) {
      socket.on('message', (message: SendMessage | JoinRoom) => {
        setMessageList((msg) => [...msg, message])
      })
    }
  }, [socket])

  return (
    <div className="space-y-4">
      {historyMessageList.map((item) => (
        <ChatBox key={item.id} {...item} />
      ))}
      {messageList.map((item, index) => (
        <ChatBox key={index} {...item} />
      ))}
    </div>
  )
}
