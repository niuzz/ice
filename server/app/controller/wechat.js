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

  async signature() {
    const { ctx } = this;
    let url = ctx.query.url;

    if (!url) ctx.throw(404);

    url = decodeURIComponent(url);
    const params = await ctx.service.wechat.getSignatureAsync(url);

    ctx.body = {
      success: 1,
      params,
    };
  }
}

module.exports = Wechat;
