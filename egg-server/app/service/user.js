'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async create(payload) {
    const { ctx } = this;
    const minaUser = await ctx.model.User.findOne({ openid: payload.openid });
    if (minaUser) {
      const id = minaUser._id;
      const user = ctx.model.User.findByIdAndUpdate(id, payload);
      return user;
    }
    const user = await ctx.model.User.create(payload);
    return user;
  }
}


module.exports = UserService;
