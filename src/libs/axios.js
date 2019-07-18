import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => { // 添加报错日记
  const {
    statusText, // 状态文本
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  // 非响应的路径包括   dispatch调度
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
class HttpRequest {
  constructor (baseUrl = baseURL) { // 初始化对象
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () { // 得到内部配置
    const config = {
      baseURL: this.baseUrl,
      headers: {
        qingniaopc: '1',
        token: store.state.user.token
      }
    }
    return config
  }
  destroy (url) { // 销毁
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) { // 拦截器   instance实例
    // 请求拦截
    instance.interceptors.request.use(config => {
      console.log(store)
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      console.log(config)
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    // 有时候我们要根据响应的状态码来进行下一步操作，
    // 例如：由于当前的token过期，接口返回401未授权，那我们就要进行重新登录的操作，用法如下：
    instance.interceptors.response.use(res => { // interceptors拦截器 重新做请求
      this.destroy(url) // 销毁
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error) // Promise 对象 拒绝
    })
  }
  request (options) { // 请求选项
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options) // 对象分配(获取内部配置, 选项)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
