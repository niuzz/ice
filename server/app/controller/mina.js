'use strict';

const Controller = require('egg').Controller;

class MinaController extends Controller {

  async login() {
    const { ctx, app } = this;
    const code = ctx.request.body.code;

    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const appId = app.config.authorization.minaAppID;
    const appSecret = app.config.authorization.minaSecret;
    const params = `?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const URI = `${apiUrl}${params}`;
    const options = {
      uri: URI,
      json: true,
    };
    ctx.helper.getSession(options).then(res => {
      ctx.body = 'kk';
      ctx.helper.success({ ctx, res });
    });
  }
}

module.exports = MinaController;
