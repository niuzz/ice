'use strict';

const rp = require('request-promise');
const crypto = require('crypto');

exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    message,
    data: result,
  };
  ctx.status = status;
};

exports.error = (ctx, code, message) => {
  ctx.body = {
    code,
    message,
  };
  ctx.status = code;
};

exports.jscode2session = async options => {
  return new Promise(function(resolve, reject) {
    rp(options).then(res => {
      if (res.session_key && res.openid) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};

exports.encryptBySha1 = data => {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
};
