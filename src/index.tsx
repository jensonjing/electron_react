import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './router'
import { AuthProvider, RequireAuth } from './router/auth' // 引入路由鉴权
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login'
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Headerdom from '@/components/Header';
import LeftMenu from '@/components/LeftMenu';
import FooterDom from '@/components/Footer';

const { Header, Footer, Sider, Content } = Layout;
let locale: any = zhCN
function changeLocale(e: any) {
    locale = e
}

const container: any = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Router>
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='*' element={
                    <RequireAuth>
                        {/* 需要登录才能用的组件 */}
                        <ConfigProvider locale={locale}>
                            <Layout className="w_wrap">
                                <Header>
                                    <Headerdom onChangeLoc={changeLocale}/>
                                </Header>
                                <Layout>
                                    <Sider width="256px" style={{ borderRight: '1px solid #f1f1f1' }}>
                                        <LeftMenu />
                                    </Sider>
                                    <Content>
                                        <App />
                                    </Content>
                                </Layout>
                                <Footer>
                                    <FooterDom />
                                </Footer>
                            </Layout>
                        </ConfigProvider>
                    </RequireAuth>
                }/>
            </Routes>
        </AuthProvider>
    </Router>
)