import useStore from '@/store'
import type { SendMessagePayload } from '@/types/chat'
import { getSocket } from '@/utils/socketClient'
import { useEffect, useRef, useState } from 'react'

export function ChatInput() {
  const { userInfo } = useStore()
  const socket = getSocket()

  const [value, setValue] = useState('')
  const sendMessage = () => {
    const trimmed = value.trim()
    if (!trimmed) return

    const payload: SendMessagePayload = {
      userId: userInfo.id,
      chatroomId: 1,
      message: {
        type: 'text',
        content: trimmed,
      },
    }
    if (socket) {
      socket.emit('sendMessage', payload)
    }
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return
      e.preventDefault()
      sendMessage()
    }
  }

  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  return (
    <textarea
      className="w-full outline-none h-full resize-none"
      placeholder="enter 发送，shift + enter 换行"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    ></textarea>
  )
}
