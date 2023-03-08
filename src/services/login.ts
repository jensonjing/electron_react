import ajax from '../libs/api';

// 登录
export const Login = async (params: any) => {
  return await ajax.post('/login', params)
}