import { Avatar } from '@/components/Avatar'
import './OnlineUser.css'
import useStore from '@/store'

export function OnlineUser() {
  const { onlineUserIds, chatroomUsers } = useStore()

  return (
    <div className="grid grid-cols-4 gap-3">
      {chatroomUsers.map((item, index) => {
        return (
          <div
            className="text-xs text-center"
            title={item.username}
            key={index}
          >
            <Avatar headPic={item.headPic} className="w-7 mx-auto" />
            <div className="pt-0.5 relative px-2">
              {onlineUserIds.includes(item.id) ? (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 mt-0.5 bg-green-500 rounded-full dot"></div>
              ) : (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 mt-0.5 bg-red-500 rounded-full"></div>
              )}
              <div className="overflow-hidden text-ellipsis flex-1 leading-none">
                {item.username}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
