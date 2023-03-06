import './index.scss'
import { useNavigate } from 'react-router-dom'
import Auth from '@/router/auth'
import store from '@/store/index'
import { CHANGE_IMG } from '@/store/consts'

export default function Login(props: any) {
  const navigate = useNavigate()
  const state = store.getState()
  const { login, logout }: any = Auth()

  function LogIn() {
    login().then((res: any) => {
      console.log('登录成功')
      store.dispatch({
        type: CHANGE_IMG,
        url: 'hhhhh'
      })
      navigate('/')
    })
  }
  return (
    <div onClick={LogIn}>LIn</div>
  )
}