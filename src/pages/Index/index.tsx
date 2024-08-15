import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { UserInfoDrawer } from '../UserInfoDrawer'

export function Index() {
  const [open, setOpen] = useState(false)
  const [headPic, setHeadPic] = useState()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const info = JSON.parse(userInfo)
      setHeadPic(info.headPic)
    }
  }, [])
  return (
    <div className="flex h-full">
      <div className="min-w-56  border-r border-[#f0f0f0]">

      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#f0f0f0]">
          <h1 className="font-bold text-xl">name</h1>
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            {
              headPic
                ? <img src={headPic} className="w-10 h-10 rounded-full" />
                : <UserOutlined style={{ fontSize: '20px' }} />
            }
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          11
        </div>
        <div className="border-t border-[#f0f0f0] min-h-40">22</div>
      </div>
      <UserInfoDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
