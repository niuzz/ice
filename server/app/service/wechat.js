'use strict';

const Service = require('egg').Service;
const WechatClient = require('../wechat-lib');

class WechatService extends Service {
  async getWechatClient() {
    const { config } = this.app;
    const mongoose = this.app.mongoose;
    const Token = mongoose.model('Token');
    // eslint-disable-next-line
		const wechatConfig = {
      wechat: {
        appID: config.authorization.appID,
        appSecret: config.authorization.appSecret,
        token: config.authorization.token,
        getAccessToken: () => Token.getAccessToken(),
        saveAccessToken: data => Token.saveAccessToken(data),
      },
    };
    const wechat = new WechatClient(wechatConfig.wechat);
    wechat.saveAccessToken({ expires_in: 111, access_token: '222' });
    return wechat;
  }
}

module.exports = WechatService;
