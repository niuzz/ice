'use strict';

const Service = require('egg').Service;
const WechatClient = require('../wechat-lib');
const WechatOAuth = require('../wechat-lib/oauth');

class WechatService extends Service {
  async getWechatClient() {
    const { config } = this.app;
    const mongoose = this.app.mongoose;
    const Token = mongoose.model('Token');
    const Ticket = mongoose.model('Ticket');
    // eslint-disable-next-line
		const wechatConfig = {
      wechat: {
        appID: config.authorization.appID,
        appSecret: config.authorization.appSecret,
        token: config.authorization.token,
        getAccessToken: async () => await Token.getAccessToken(),
        saveAccessToken: async data => await Token.saveAccessToken(data),
        getTicket: async () => await Ticket.getTicket(),
        saveTicket: async data => await Ticket.saveTicket(data),
      },
    };


    const wechat = new WechatClient(wechatConfig.wechat);

    return wechat;
  }

  async getOAuth() {
    const { config } = this.app;
    // eslint-disable-next-line
    const wechatConfig = {

      wechat: {
        appID: config.authorization.appID,
        appSecret: config.authorization.appSecret,
        token: config.authorization.token,
      },
    };
    const oauth = new WechatOAuth(wechatConfig.wechat);

    return oauth;
  }

  async getSignatureAsync(url) {
    const { ctx } = this;
    const wechatClient = await ctx.service.wechat.getWechatClient();
    const data = await wechatClient.fetchAccessToken();
    const token = data.access_token;

    const ticketData = await wechatClient.fetchTicket(token);
    const ticket = ticketData.ticket;

    const params = wechatClient.sign(ticket, url);
    params.appId = wechatClient.appID;

    return params;
  }

  async getAuthorizeURL(...args) {
    const { ctx } = this;
    const oauth = await ctx.service.wechat.getOAuth();

    return oauth.getAuthorizeURL(...args);
  }

  async getUserByCode(code) {
    const { ctx } = this;
    const oauth = await ctx.service.wechat.getOAuth();

    const data = await oauth.fetchAccessToken(code);

    console.log('-----------------------');
    console.log(code);
    console.log('-----------------------');

    const openid = data.openid;
    const user = await oauth.getUserInfo(data.access_token, openid);

    return user;
  }
}

module.exports = WechatService;
