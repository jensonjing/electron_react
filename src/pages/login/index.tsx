import './index.scss'
import { useNavigate } from 'react-router-dom'
import Auth from '@/router/auth'
import store from '@/store/index'
import { CHANGE_IMG } from '@/store/consts'
import { useEffect } from 'react'
import { Login as LIn } from '@/services/login'

export default function Login(props: any) {
  const navigate = useNavigate()
  const state = store.getState()
  const { login, logout }: any = Auth()

  function LogIn() {
    LIn({
      username: 'admin',
      passworld: '123456'
    }).then(res => {
      console.log(res)
    })
    login().then((res: any) => {
      console.log('登录成功')
      store.dispatch({
        type: CHANGE_IMG,
        url: 'hhhhh'
      })
      navigate('/')
    })
  }

  useEffect(() => {
    // console.log(process.env)
  }, [])
  return (
    <div onClick={LogIn}>LIn</div>
  )
}