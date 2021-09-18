import axios from 'axios'
import { Message } from 'element-ui'
import GlobalStoreService from '@/utils/auth'
import CommonUtil from '@/utils/commonUtil'
import { errorCode, systemErrorCode, businessErrorCode } from '@/utils/errorCodes'
import Qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 180000 // request timeout
})

service.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
service.defaults.headers['reqSource'] = 'WEB'
// request interceptor
service.interceptors.request.use(config => {
  const currentUser = GlobalStoreService.get('currentUser')
  if (!!currentUser && !!currentUser.jsToken) {
    config.headers['jsToken'] = currentUser.jsToken // 登录认证token
  }
  if (!!currentUser && !!currentUser.jsCurAccNo) {
    config.headers['jsCurAccNo'] = currentUser.jsCurAccNo // 当前登录账号
  }
  if (!config.method) { // set default http method
    config.method = 'POST'
  }
  if(config.method.toUpperCase() == 'POST'){
    config.data = config.params
    config.params = ''
  }
  if (config.headers['Content-Type'].indexOf('form') !== -1) {
    config.data = Qs.stringify(config.data);
  }
  
  return config
}, error => {
  // Do something with request error
  // console.log('service.interceptors.request ', error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // console.log('axios RS ', response)
    if (!!response && !!response.data && !!response.data.respCode) {
      if (response.data.success) {
        // 调用接口成功
        return Promise.resolve(response.data)
      } else {
        // 调用失败
        const respCode = response.data.respCode
        if (respCode in errorCode) { // 系统特定错误码
          Message({
            message: errorCode[respCode],
            type: 'error'
          })
          //CommonUtil.fwLogout()
        }
        if (respCode in systemErrorCode) { // 处理失败
          Message({
            message: response.data.respMsg || systemErrorCode[respCode],
            type: 'error'
          })
          return Promise.reject()
        }
        if (respCode in businessErrorCode) { // 业务异常
          return Promise.reject(response)
        }
        // 其它错误，展示接口提示信息即可
        Message({
          message: response.data.respMsg || '未知错误！',
          type: 'error'
        })
        return Promise.reject()
      }
    } else {
      return response
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  })

export default service
