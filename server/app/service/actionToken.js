'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  async apply(_id) {
    const { ctx } = this;

    // return ctx.app.jwt.sign({
    //   data: {
    //     _id,
    //   },
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    // }, ctx.app.config.jwt.secret);
    const data = { id: '111' };
    return ctx.app.jwt.sign(data);
    // return ctx.app.jwt.sign(data, ctx.app.config.jwt.secret, {
    //   expiresIn: '24h',
    // });
  }
}

module.exports = ActionTokenService;
