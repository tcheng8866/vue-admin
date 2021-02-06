import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // 不需要配置baseUrl
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    // config.headers['Access-Control-Allow-Origin'] = true
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['token'] = getToken()
    // config.headers['Authorization'] = 'bearer 067e2ea3-84b9-4366-ba93-8a9b3417971d'
    config.headers['appName'] = 'if-bm-front' // 和bm-front、bm-core一致[改动影响不可控]
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    // http 200  但业务返回 9999这种情况
    if (response.data.code && response.data.code !== '0000') {
      // sso 的状态码 TODO
      if (response.data.code === 1002) {
        // 此处不给退出（/login），用户主动退出才跳转登陆页面

        // store.dispatch('user/logout')
        // store.dispatch('tagsView/delAllViews') // 关闭tags
      }
      // 远程调用服务异常
      Message.error(response.data.message || response.data.msg)
    }
    // console.log(response.data.body)
    // 此处返回可能是 null
    return response.data
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error('服务器超时！')
    }
    if (error.response) {
      // 根据响应状态码，做不同错误处理
      switch (error.response.status) {
        case 500:
          break
        case 401:
          localStorage.clear()
          sessionStorage.clear()
          Message.error((error.response && error.response.data && error.response.data.error_description) || error.response.data.message)
          router.push('/login')
          break
        default:
          break
      }
    }
    return Promise.reject(error && error.response)
  }
)
// 不是默认导出可以导出时修改名称
export { service as axios }
