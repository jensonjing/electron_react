import Home from '@/pages/home'
import About from '@/pages/about'
import Log from '@/pages/log'
// import Login from '@/pages/login'
import { Navigate } from 'react-router-dom'

// 用来禁用eslint警告
// eslint-disable-next-line
export default [
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/about',
    element: <About/>,
    children: [
      {
        path: 'log', // 也可写成'/about/log'
        element: <Log/>
      }
    ]
  },
  {
    path: '/',
    element: <Navigate to="/home"/>
  }
]