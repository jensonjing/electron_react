import { useNavigate } from 'react-router-dom'
import Auth from '@/router/auth'
import { useEffect } from 'react'
import store from '@/store'

export default function Home() {
  const navgate = useNavigate()
  const { logout }: any = Auth()

  const goLogin = () => {
    navgate('/about')
  }
  const goLog = () => {
    navgate('/about/log')
  }
  const Leave = () => {
    logout().then((res: any) => {
      console.log(res, '退出成功')
    })
  }

  useEffect(() => {
    console.log(store.getState())
  },[])
  return <>
    <div onClick={goLogin}>About</div>
    <div onClick={goLog}>Log</div>
    <div onClick={Leave}>Logout</div>
  </>
}