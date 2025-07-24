import { useNavigate } from 'react-router-dom'
import React from 'react'
import type { Chatroom } from '@/types/chat'

export const ChatroomBox = React.memo((props: Chatroom) => {
  const navigate = useNavigate()

  return (
    <div
      key={props.id}
      className="border border-gray-300 cursor-pointer rounded-lg p-2"
      onClick={() => navigate(`/chatroom/${props.id}`)}
    >
      <div>
        {props.name} ({props.userCount})
      </div>
      <div className="text-xs opacity-50">
        {new Date(props.createTime).toLocaleString()}
      </div>
    </div>
  )
})
