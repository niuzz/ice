'use strict';
const sha1 = require('sha1');

module.exports = () => {
  return async function signature(ctx) {
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
    const sha = sha1(str);
    if (sha === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'Failed';
    }
  };
};

