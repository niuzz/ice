'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');

class Wechat extends Controller {
  async hear() {
    const { ctx, app } = this;
    const { authorization } = app.config;
    const token = authorization.token;
    const {
      signature,
      nonce,
      timestamp,
      echostr,
    } = ctx.query;
    const str = [ token, timestamp, nonce ].sort().join('');
    const sha = sha1(str);
    if (sha === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'Failed';
    }
  }

  async getClient() {
    const { ctx } = this;
    const wechatClient = await ctx.service.wechat.getWechatClient();
    ctx.body = wechatClient;
  }

  async mo() {
    const { ctx } = this;
    const result = ctx.model.User.find({}).exec();
    ctx.body = result;
  }
}

module.exports = Wechat;
