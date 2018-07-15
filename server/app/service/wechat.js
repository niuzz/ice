'use strict';

const Service = require('egg').Service;
const WechatClient = require('../wechat-lib');

class WechatService extends Service {
  constructor(ctx) {
    super(ctx);
    const { config } = this.app;
    const mongoose = this.app.mongoose;
    const Token = mongoose.model('Token');
    // eslint-disable-next-line
		const wechatConfig = {
      wechat: {
        appID: config.authorization.appID,
        appSecret: config.authorization.appSecret,
        token: config.authorization.token,
        getAccessToken: async () => await Token.getAccessToken(),
        saveAccessToken: async data => await Token.saveAccessToken(data),
      },
    };
  }

  async getWechatClient() {
    const wechat = new WechatClient(WechatService.wechatConfig.wechat);
    return wechat;
  }
}

module.exports = WechatService;
