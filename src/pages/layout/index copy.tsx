import './index.less'
import 'antd/dist/reset.css';

import { Layout, ConfigProvider, Radio } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import { useRef, useState } from 'react';
import Headerdom from '@/components/Header';
import LeftMenu from '@/components/LeftMenu';
import FooterDom from '@/components/Footer';
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;

function App(props: any) {
  const locale = useRef(zhCN)

  const changeRoute = (e: any, path: string) => {
    // this.setState(() => ({
    //   routepath: path,
    // }));
    console.log(path)
    // History.push('/' + path);
  };
  function changeLocale(e: any) {
    const locale = e.target.value;
    console.log(locale)
    // this.setState(() => ({
    //   locale,
    // }));
  }
  return (
    <ConfigProvider locale={locale.current}>
      <Layout className="w_wrap">
        <Header>
          <Headerdom />
          <div className="provide-Box">
            <Radio.Group value={locale} onChange={(e) => changeLocale(e)}>
              <Radio.Button key="cn" value={zhCN}>
                中文
              </Radio.Button>
              <Radio.Button key="en" value={enUS}>
                English
              </Radio.Button>
            </Radio.Group>
          </div>
        </Header>
        <Layout>
          <Sider width="256px" style={{ borderRight: '1px solid #f1f1f1' }}>
            <LeftMenu changeRoute={changeRoute} />
          </Sider>
          <Content>
            <div>{props.children}</div>
          </Content>
        </Layout>
        <Footer>
          <FooterDom />
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App