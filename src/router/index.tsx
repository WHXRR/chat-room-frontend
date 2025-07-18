import { createBrowserRouter } from 'react-router-dom';
import WithSuspense from '@/components/WithSuspense';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Chatroom = lazy(() => import('@/pages/Chatroom'));

export const routes = [
  {
    path: '/',
    element: WithSuspense(<Home />),
  },
  {
    path: 'chatroom',
    element: WithSuspense(<Chatroom />),
  },
];

export const router = createBrowserRouter(routes);
