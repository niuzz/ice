/**
 * 微信异步请求
 * Created by niuzz on 17/11/26.
 */
import request from 'request-promise'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential'
}

export default class Wechat {
  constructor (opts) {
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    this.fetchAccessToken()
  }
  
  async request (options) {
    options = Object.assign({}, options, {json: true})
  
    try {
      const response = await request(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }
  
  async fetchAccessToken () {
    let data = await this.getAccessToken()

    if (!this.isValidToken(data, 'access_token')) {
      data = await this.updateAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }
  
  async updateAccessToken () {
    const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
  
    const data = await this.request({url: url})
    const now = (new Date().getTime())
    // 20秒缓冲
    const expiresIn = now + (data.expires_in - 20) * 1000
  
    data.expires_in = expiresIn
  
    return data
  }

  isValidToken (data, name) {
    if (!data || !data[name] || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = (new Date().getTime())

    if (now < expiresIn) {
      return true
    } else {
      return false
    }
  }
}
