'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  async createToken(_id) {
    const { app } = this;

    return app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, app.config.jwt.secret);
  }
}

module.exports = ActionTokenService;
