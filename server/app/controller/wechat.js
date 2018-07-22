'use strict';

const Controller = require('egg').Controller;
// const sha1 = require('sha1');

class Wechat extends Controller {
  async hear() {
    const { ctx } = this;
    ctx.body = 'wechat hear ok';
  }

  async getClient() {
    const { ctx } = this;
    const wechatClient = await ctx.service.wechat.getWechatClient();
    const token = await wechatClient.getAccessToken();
    ctx.body = token;
  }
}

module.exports = Wechat;
