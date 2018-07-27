'use strict';

const Controller = require('egg').Controller;
const urlParse = require('url');
const queryParse = require('querystring');
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

  // 网页上点某按钮，直接跳转到 http://x.o/wechat-redirect?visit=a&id=b
  // 用户被重定向到 Wechat Redirect URL 授权验证
  // 验证后，自动二跳进入 http://x.o/oauth?code=xxxxxx&state=a_b
  async redirect() {
    const { ctx } = this;
    const { config } = this.app;
    const redirect = config.SITE_ROOT_URL + '/oauth';
    const scope = 'snsapi_userinfo';
    const { visit, id } = ctx.query;
    const params = id ? `${visit}_${id}` : visit;

    const url = ctx.service.wechat.getAuthorizeURL(scope, redirect, params);

    ctx.redirect(url);
  }

  async oauth() {
    const { ctx } = this;
    const url = ctx.query.url;
    const urlObj = urlParse(decodeURIComponent(url));
    const params = queryParse(urlObj.query);
    const code = params.code;
    const user = await ctx.service.wechat.getUserByCode(code);

    console.log(user);
    ctx.session = {
      openid: user.openid,
    };
    ctx.body = {
      success: true,
      user,
    };
  }
}

module.exports = Wechat;
