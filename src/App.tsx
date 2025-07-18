import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { ConfigProvider } from 'antd'

export function App() {
  return <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ef857d',
          colorInfo: '#ef857d',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </>
}