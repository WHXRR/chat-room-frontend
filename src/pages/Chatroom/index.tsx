import { Container } from './Container'
import { Header } from './Header'
import { Tools } from './Tools'
import { Config } from './Config'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import useStore from '@/store'
import { SocketContext } from '@/context/SocketContext'
import { getChatroomInfo } from '@/interfaces/api'
import { message } from 'antd'
import { ChatroomContext } from '@/context/ChatroomContext'
import type { ChatroomInfo } from '@/types/chat'

export default function Chatroom() {
  const socketRef = useRef<Socket>(null)
  const { userInfo } = useStore()

  useEffect(() => {
    socketRef.current = io('http://localhost:3001')
    socketRef.current.on('connect', () => {
      const payload = {
        chatroomId: 1,
        userId: userInfo.id,
        username: userInfo.username,
      }
      if (socketRef.current) {
        getRoomInfo()
        socketRef.current.emit('joinRoom', payload)
      }
    })
  }, [])

  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfo | null>(null)
  const getRoomInfo = async () => {
    try {
      const res = await getChatroomInfo(1)
      if (res.status === 201 || res.status === 200) {
        setChatroomInfo(res.data)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
    }
  }

  return (
    <SocketContext value={socketRef.current}>
      <ChatroomContext value={chatroomInfo}>
        <div className="flex h-full">
          <div className="w-[50px] hidden md:block border-r border-gray-200 p-2">
            <Tools />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="border-b border-gray-200 px-2">
              <Header />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1">
                <Container />
              </div>
              <div className="w-[250px] p-2 hidden md:block border-l border-gray-200">
                <Config />
              </div>
            </div>
          </div>
        </div>
      </ChatroomContext>
    </SocketContext>
  )
}
