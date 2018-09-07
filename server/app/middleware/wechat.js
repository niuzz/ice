'use strict';
const sha1 = require('sha1');
const getRawBody = require('raw-body');
const util = require('../wechat-lib/util');
const reply = require('../wechat-lib/reply');

module.exports = () => {
  return async function signature(ctx, next) {
    const { app } = ctx;
    if (ctx.request.url.indexOf('/api') > -1) {
      await next();
      return false;
    }
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
    if (ctx.method === 'GET') { // 如果是GET请求，为微信服务器发送Token验证
      if (sha === signature) {
        ctx.body = echostr;
      } else {
        ctx.body = 'Failed';
      }
    } else if (ctx.method === 'POST') {
      if (sha !== signature) { // 校验是否来自微信服务器
        ctx.body = 'Failed';
        return false;
      }
      const data = await getRawBody(ctx.req, { // 解析二进制流
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset,
      });

      const content = await util.parseXML(data); // 解析xml
      const message = util.formatMessage(content.xml); // 格式化message
      ctx.weixin = message;

      await reply.apply(ctx, [ ctx ]);

      const replyBody = ctx.body;
      const msg = ctx.weixin;
      const xml = util.tpl(replyBody, msg);

      ctx.status = 200;
      ctx.type = 'application/xml';
      ctx.body = xml;
    }
  };
};

