'use strict';

const moment = require('moment');
const crypto = require('crypto');
const rp = require('request-promise');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// 获取 Token
exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};

// 校验 Token
exports.verifyToken = async (ctx, userId) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.auth.verifyToken(token);
  if (!verifyResult.verify) {
    ctx.helper.error(ctx, 401, verifyResult.message);
    return false;
  }
  if (userId !== verifyResult.message.id) {
    ctx.helper.error(ctx, 401, '用户 ID 与 Token 不一致');
    return false;
  }
  ctx.helper.success({ ctx, res: verifyResult });
  return true;
};

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功', code = 200 }) => {
  ctx.body = {
    code,
    data: res,
    msg,
  };
  ctx.status = 200;
};

exports.getSession = options => {

  return new Promise(function(resolve, reject) {
    rp(options).then(res => {
      if (res.session_key && res.openid) {
        resolve(res.openid);
      } else {
        reject(res);
      }
    });
  });
};

exports.decryptByAES = (encrypted, key, iv) => {
  encrypted = new Buffer(encrypted, 'base64');
  key = new Buffer(key, 'base64');
  iv = new Buffer(iv, 'base64');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

exports.encryptBySha1 = data => {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
};
