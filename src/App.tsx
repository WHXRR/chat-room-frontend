import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { ConfigProvider, App } from 'antd'
import BGImage from '@/assets/images/bg.webp'

export function Root() {
  return <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ef857d',
          colorInfo: '#ef857d',
        },
      }}
    >
      <App className='w-screen h-screen bg-cover bg-[#fbf7f4]' style={{ backgroundImage: `url(${BGImage})` }}>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </>
}