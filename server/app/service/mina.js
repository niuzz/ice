'use strict';

const Service = require('egg').Service;

class MinaService extends Service {
  async create(code) {
    const { ctx, app } = this;
    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const appId = app.config.authorization.minaAppID;
    const appSecret = app.config.authorization.minaSecret;
    const params = `?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const URI = `${apiUrl}${params}`;
    const options = {
      uri: URI,
      json: true,
    };
    const result = await ctx.helper.getSession(options);
    const { session_key } = result;
    const skey = ctx.helper.encryptBySha1(session_key);
    result.skey = skey;
    ctx.model.MinaUser.create(result);
    return { openid: result.openid, skey: result.skey };
  }
}

module.exports = MinaService;
