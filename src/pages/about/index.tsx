import { Outlet } from 'react-router-dom'

export default function About() {

  return (<>
    about
    <div>
      {/* 用来显示子路由页面，类似于vue的路由占位 */}
      <Outlet />
    </div>
  </>)
}