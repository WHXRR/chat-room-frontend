import type {
  HistoryMessage,
  JoinRoomMessageType,
  SendMessage,
} from '@/types/chat'
import { Avatar } from './Avatar'
import useStore from '@/store'
import { useEffect, useRef, useState } from 'react'

export function ChatBox(
  props: HistoryMessage | SendMessage | JoinRoomMessageType,
) {
  const { type } = props
  const { userInfo } = useStore()

  const boxRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.1,
      },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {type === 'joinRoom' && (
        <div className="text-center text-sm">{props.username}进入了房间</div>
      )}
      {type === 'historyMessage' || type === 'sendMessage' ? (
        <div
          ref={boxRef}
          className={`flex gap-2 ${isVisible ? 'show' : ''} ${
            props.sender?.id === userInfo.id
              ? 'flex-row-reverse message-box-right'
              : 'message-box-left'
          }`}
        >
          {props.sender?.headPic && (
            <Avatar headPic={props.sender.headPic} className="w-7" />
          )}
          <div className="bg-[#ff9e97] p-2 rounded-lg">{props.content}</div>
        </div>
      ) : null}
    </div>
  )
}
