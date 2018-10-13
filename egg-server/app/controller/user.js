'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.UserCreateRule = {
      session_key: { type: 'string', required: true, allowEmpty: false },
      openid: { type: 'string', required: true, allowEmpty: false },
    };
  }

  async index() {
    this.ctx.body = 'index';
  }

  async create() {
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

    const result = await ctx.helper.jscode2session(options);
    result.nickName = '';
    // 校验参数完整
    ctx.validate(this.UserCreateRule, result);

    let res = await ctx.service.user.create(result);
    const { _id } = res;
    res = { _id };
    ctx.helper.success(ctx, res);
  }

  async update() {
    const { ctx, service } = this;
    const { _id, detail } = ctx.request.body;
    const { encryptedData, iv } = detail;
    const { session_key } = await service.user.show(_id);
    let userInfo = await ctx.helper.decodeUserInfo(session_key, iv, encryptedData);
    userInfo = JSON.parse(userInfo);
    const res = await service.user.update(_id, userInfo);
    ctx.helper.success(ctx, { _id: res._id });
  }
}

module.exports = UserController;
