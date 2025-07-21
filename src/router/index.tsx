import { createBrowserRouter } from 'react-router-dom'
import WithSuspense from '@/components/WithSuspense'
import { lazy } from 'react'
import PrivateRoute from '@/components/PrivateRoute'

const Home = lazy(() => import('@/pages/Home'))
const Chatroom = lazy(() => import('@/pages/Chatroom'))
const NotFound = lazy(() => import('@/pages/404'))

export const routes = [
  {
    path: '/',
    element: <PrivateRoute>{WithSuspense(<Home />)}</PrivateRoute>,
  },
  {
    path: '/chatroom',
    element: <PrivateRoute>{WithSuspense(<Chatroom />)}</PrivateRoute>,
  },
  {
    path: '*',
    element: WithSuspense(<NotFound />),
  },
]

export const router = createBrowserRouter(routes)
