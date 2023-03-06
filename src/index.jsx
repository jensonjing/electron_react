import './index.less'
import { createRoot } from 'react-dom/client'
import App from './router'
import { AuthProvider, RequireAuth } from './router/auth' // 引入路由鉴权
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Router>
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='*' element={
                    <RequireAuth>
                        {/* 需要登录才能用的组件 */}
                        <App />
                    </RequireAuth>
                }/>
            </Routes>
        </AuthProvider>
    </Router>
)