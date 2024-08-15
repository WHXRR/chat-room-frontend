import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Index } from '../pages/Index'
import { Register } from '../pages/Register'
import { UpdatePassword } from '../pages/UpdatePassword'
import { ErrorPage } from '../pages/ErrorPage'

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/update_password',
    element: <UpdatePassword />,
  },
]

export const router = createBrowserRouter(routes)
