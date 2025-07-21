import type { UserInfo } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  userInfo: UserInfo
  updateUserInfo: (data: UserInfo) => void
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      userInfo: {
        username: '',
        headPic: 'baimao',
        createTime: '',
        email: '',
        id: 0,
        token: '',
        updateTime: '',
      },
      updateUserInfo: (data) => set({ userInfo: data }),
    }),
    {
      name: 'moyushuang',
      partialize: (state) => ({ userInfo: state.userInfo }),
    },
  ),
)

export default useStore
