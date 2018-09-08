'use strict';

const Controller = require('egg').Controller;

const crypto = require('crypto');
const request = require('request-promise');

class officialAccountsController extends Controller {
  async listen(ctx) {
    const { app } = ctx;
    const { authorization } = app.config;

    const token = authorization.token;
    const {
      signature,
      nonce,
      timestamp,
      echostr,
    } = ctx.query;

    const str = [ token, timestamp, nonce ].sort().join('');
    const hash = crypto.createHash('sha1');
    const sha = hash.update(str).digest('hex');

    if (sha === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'Failed';
    }
  }

  async fetchToken(ctx) {

  }
}

module.exports = officialAccountsController;
