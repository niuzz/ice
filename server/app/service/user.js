'use strict';

const Service = require('egg').Service;

class User extends Service {

  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(payload.mobile);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    const verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, 'user password is error');
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user._id) };
  }
}

module.exports = User;
