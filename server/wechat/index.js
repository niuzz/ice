/**
 * Created by niuzz on 17/12/2.
 */
import mongoose from 'mongoose'
import config from '../conf'
import Wechat from '../wechat-lib'

const Token = mongoose.model('Token')

const wechatConfig = {
  wechat: {
    appID: config.wechat.appID,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    getAccessToken: async () => { await Token.getAccessToken() },
    saveAccessToken: async (data) => { await Token.saveAccessToken(data) }
  }
}

export const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat)
  
  return wechatClient
}
