'use strict';

const Service = require('egg').Service;

class MinaService extends Service {
  async create(result) {
    const { ctx } = this;

    let id = '';
    const minaUser = await ctx.model.MinaUser.findOne({ openid: result.openid });
    if (minaUser) {
      id = minaUser._id;
      ctx.model.MinaUser.findByIdAndUpdate(id, result);
    } else {
      const user = await ctx.model.MinaUser.create(result);
      id = user._id;
    }

    return { openid: result.openid, skey: result.skey, id };
  }
}

module.exports = MinaService;
