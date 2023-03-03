import './index.less'
import { useNavigate } from 'react-router-dom'
import Auth from '@/router/auth'

export default function Login(props: any) {
  const navigate = useNavigate()
  const { login, logout }: any = Auth()

  function LogIn() {
    login().then((res: any) => {
      console.log('登录成功')
      navigate('/')
    })
  }
  return (
    <div onClick={LogIn}>LIn</div>
  )
}