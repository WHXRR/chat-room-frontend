import { ChatInput } from './components/ChatInput'

export function Container() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-2">11</div>
      <div className="h-[200px] border-t border-gray-200 p-2">
        <ChatInput />
      </div>
    </div>
  )
}
