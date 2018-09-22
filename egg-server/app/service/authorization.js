'use strict';

const Service = require('egg').Service;

class AuthorizationService extends Service {
  createToken(data) {
    const { app } = this;
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '24h',
    });
  }
  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      const { app } = this;
      app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {
        const result = {};
        if (err) {
          result.verify = false;
          result.message = err.message;
          reject(result);
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }
}

module.exports = AuthorizationService;
