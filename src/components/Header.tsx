import './Header.scss';
import React, { useRef, useState } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import { Radio } from 'antd';
import Auth from '@/router/auth'

export default function Headerdom(props: any) {
  const { logout }: any = Auth()
  const [locale, setlocale] = useState(zhCN)

  const loginout = () => {
    logout().then((res: any) => {
      console.log(res, '退出成功')
    })
  };
  function changeLocale(e: any) {
    const loc = e.target.value;
    setlocale(loc)
    props.onChangeLoc(loc)
  }

  return (
    <>
      <div className="headerbox">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="logo"
            src="https://publicvp.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E8%BD%AF.png"
            alt="Logo"
          />
          <span className="title">工具平台</span>
        </div>
        <div className="provide-Box">
          <Radio.Group value={locale} onChange={(e) => changeLocale(e)}>
            <Radio.Button key="cn" value={zhCN}>中文</Radio.Button>
            <Radio.Button key="en" value={enUS}>English</Radio.Button>
          </Radio.Group>
        </div>
        <div className="loginOut" onClick={loginout}>退出登录</div>
      </div>
    </>
  )
}
