import './Header.less';
import React from 'react';
// import { history as History } from 'umi';

interface AppProps {}
interface AppState {}

export default class Headerdom extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.loginout = this.loginout.bind(this);
  }

  render() {
    return (
      <>
        <div className="headerbox">
          <div>
            <img
              className="logo"
              src="https://publicvp.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E8%BD%AF.png"
              alt="Logo"
            />
            <span className="title">工具平台</span>
          </div>
          <div className="loginOut" onClick={this.loginout}>
            退出登录
          </div>
        </div>
      </>
    );
  }

  loginout = () => {
    window.sessionStorage.removeItem('token');
    // History.push('/login');
  };
}
