/**
 * Created by niuzz on 17/10/1.
 */
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: 'http://natapp.niuzhuangzhi.com/api/', // baseUrl
  timeout: 5000, // 超时时间
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})

// 响应拦截
service
  .interceptors
  .response
  .use(function (response) {
    return response
  }, function (error) {
    Message({
      message: '网络连接错误',
      type: 'error',
      duration: 5 * 1000
    })
    // 处理响应失败
    return Promise.reject(error)
  })

export default service
