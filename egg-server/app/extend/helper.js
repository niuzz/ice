'use strict';
const rp = require('request-promise');
const crypto = require('crypto');

exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 200,
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

// 获取 Token
exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};

// 微信服务器code换session_key
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

exports.decodeUserInfo = async (key, iv, crypted) => {
  crypted = new Buffer(crypted, 'base64');
  key = new Buffer(key, 'base64');
  iv = new Buffer(iv, 'base64');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decoded = decipher.update(crypted, 'base64', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
};

exports.encryptBySha1 = data => {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
};

exports.getDate = AddDayCount => {
  const dd = new Date();
  dd.setDate(dd.getDate() + parseInt(AddDayCount));// 获取AddDayCount天后的日期
  const y = dd.getFullYear();
  const m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return y + '-' + m + '-' + d;
};
