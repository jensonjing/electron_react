import './index.scss'
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom'
import Auth from '@/router/auth'
import { useEffect } from 'react'
import store from '@/store'
import { Button } from 'antd';

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
    <Button type='primary' style={{display: 'block',marginBottom: '15px'}} onClick={goLogin}>About</Button>
    <Button type='primary' style={{display: 'block',marginBottom: '15px'}} onClick={goLog}>Log</Button>
    <Button type='primary' style={{display: 'block',marginBottom: '15px'}} onClick={Leave}>Logout</Button>
  </>
}