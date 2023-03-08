import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


class Ajax {
  private ajax: AxiosInstance

  constructor() {
    // const url: any = process.env.NODE_ENV === "development" ? "/api" : process.env.REACT_APP_BASE_API
    const url: any = process.env.REACT_APP_BASE_API
    this.ajax = axios.create({
      withCredentials: false, // 是否允许浏览器携带cookie
      baseURL: url,
      timeout: 30000
    })
    // console.log(import.meta.env)
    // 拦截器
    this.ajax.interceptors.request.use(
      (config: any) => {
        const token: any = sessionStorage.getItem('token')
        if (token) {
          config.headers.Authorization = "Bearer " + token
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    )
  }

  async get(url: any, args?: any, config?: AxiosRequestConfig){
    config = {
      params: args,
      ...config
    }
    var begin = Date.now();
    const r: any = await this.ajax.get(url, config)
    var time = Date.now() - begin;
    // ARMS数据监控https://help.aliyun.com/document_detail/58657.html#sc-api
    // (window as any).__bl.api(url, true, time, r.data.code, r.data.msg, begin);
    return r.data
  }
  async post(url: any, args: any, config?: AxiosRequestConfig){
    config = {
      ...config,
      headers: { "Content-Type": "application/json" }
    }
    var begin = Date.now();
    const r: any = await this.ajax.post(url, args, config)
    var time = Date.now() - begin;
    // ARMS数据监控https://help.aliyun.com/document_detail/58657.html#sc-api
    // (window as any).__bl.api(url, true, time, r.data.code, r.data.msg, begin);
    return r.data
  }
  async put(url: any, args?: any, config?: AxiosRequestConfig){
    config = {
      ...config,
      headers: { "Content-Type": "application/json" }
    }
    var begin = Date.now();
    const r: any = await this.ajax.put(url, args, config)
    var time = Date.now() - begin;
    // ARMS数据监控https://help.aliyun.com/document_detail/58657.html#sc-api
    // (window as any).__bl.api(url, true, time, r.data.code, r.data.msg, begin);
    return r.data
  }
  async delete(url: any, args?: any, config?: AxiosRequestConfig){
    config = { ...config, params: args }
    var begin = Date.now();
    const r: any = await this.ajax.delete(url, config)
    var time = Date.now() - begin;
    // ARMS数据监控https://help.aliyun.com/document_detail/58657.html#sc-api
    // (window as any).__bl.api(url, true, time, r.data.code, r.data.msg, begin);
    return r.data
  }
  async request(config: AxiosRequestConfig){
    var begin = Date.now();
    const r = await this.ajax.request(config);
    var time = Date.now() - begin;
    // ARMS数据监控https://help.aliyun.com/document_detail/58657.html#sc-api
    // (window as any).__bl.api((config as any)?.url, true, time, r.data.code, r.data.msg, begin);
    return r.data;
  }
}

export default new Ajax()