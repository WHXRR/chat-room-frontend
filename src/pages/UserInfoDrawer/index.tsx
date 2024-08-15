import { Drawer } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { UserInfoModal } from './UserInfo'

export function UserInfoDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [userInfoModal, setUserInfoModal] = useState(false)
  return (
    <>
      <Drawer onClose={onClose} open={open} forceRender>
        <div className="flex border-b border-color-[#f0f0f0] justify-between items-center cursor-pointer pb-2" onClick={() => setUserInfoModal(true)}>
          <div>修改信息</div>
          <EditOutlined />
        </div>
      </Drawer>
      <UserInfoModal open={userInfoModal} onClose={() => setUserInfoModal(false)} />
    </>
  )
}
