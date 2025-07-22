import { ChatInput } from './components/ChatInput'
import { ChatList } from './components/ChatList'

export function Container() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        <ChatList />
      </div>
      <div className="h-[200px] border-t border-gray-200 p-2">
        <ChatInput />
      </div>
    </div>
  )
}
