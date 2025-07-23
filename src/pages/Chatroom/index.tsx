import { Container } from './Container'
import { Header } from './Header'
import { Tools } from './Tools'
import { Config } from './Config'
import { useEffect, useState } from 'react'
import useStore from '@/store'
import { getChatroomInfo } from '@/interfaces/api'
import { ChatroomContext } from '@/context/ChatroomContext'
import type { ChatroomInfo } from '@/types/chat'
import { disconnectSocket, initSocket } from '@/utils/socketClient'

export default function Chatroom() {
  const { userInfo, updateChatroomUsers } = useStore()

  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfo | null>(null)
  const getRoomInfo = async () => {
    try {
      const res = await getChatroomInfo(1)
      if (res.status === 201 || res.status === 200) {
        setChatroomInfo(res.data)
        updateChatroomUsers(res.data.users)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    initSocket(userInfo, import.meta.env.VITE_CHATROOM_ID)
    getRoomInfo()
    return () => {
      disconnectSocket()
    }
  }, [])

  return (
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
  )
}
