// // 路由鉴权/登录拦截
// const { Redirect } = require('dva').router;

// // eslint-disable-next-line
// export default (props: any) => {
//   const isLogin = window.sessionStorage.getItem('token');
//   if (isLogin) {
//     return <div>{props.children}</div>;
//   } else {
//     return <Redirect to="/login" />;
//   }
// }
import React, { useState, createContext, useContext } from "react";
import { Navigate } from 'react-router-dom';

const AuthContext = createContext({});

/**
 * 自定义hook，函数返回Context值，包括authed状态，login，loginout函数来修改authed的值
 */
function useAuth() {
  const isLogin = sessionStorage.getItem('token') ? true : false
  const [authed, setauthed] = useState(isLogin)

  return {
    authed,
    login() {
      return new Promise((res: any) => {
        setauthed(true);
        sessionStorage.setItem('token', 'TTKON')
        res(true)
      })
    },
    logout() {
      return new Promise((res: any) => {
        setauthed(false);
        sessionStorage.clear()
        res(false)
      })
    }
  }
}

// 将context值传给Context Provider，并返回改组件用于广播context的值
export function AuthProvider({ children }: any) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
// 返回Context值
export default function AuthConsumer() {
  return useContext(AuthContext)
}

/**
 * 封装拦截组件，如果已登录就返回包括children组件
 * 未登录返回<Navigate to="/login"/>组件跳到登录界面
 */
export function RequireAuth({ children }: any) {
  const { authed }: any = AuthConsumer()
  return authed === true ? (children) : (
    <Navigate to="/login" replace/>
  )
}