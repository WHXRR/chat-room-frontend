import { ChatBox } from '@/components/ChatBox'
import { getHistoryMessage } from '@/interfaces/api'
import useStore from '@/store'
import type { HistoryMessage } from '@/types/chat'
import { useEffect, useRef, useState } from 'react'

export function ChatList() {
  const [historyMessageList, setHistoryMessageList] = useState<
    Array<HistoryMessage>
  >([])
  const { messageList } = useStore()

  const getChatHistory = async () => {
    try {
      const res = await getHistoryMessage(1)
      if (res.status === 201 || res.status === 200) {
        setHistoryMessageList(res.data)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getChatHistory()
  }, [])

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [historyMessageList, messageList])

  return (
    <div className="space-y-4 h-full p-4 overflow-y-auto">
      {historyMessageList.map((item) => (
        <ChatBox key={item.id} {...item} type="historyMessage" />
      ))}
      {messageList.map((item, index) => (
        <ChatBox key={index} {...item} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
