'use strict';

const Controller = require('egg').Controller;
const OAuth = require('co-wechat-oauth');


class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async api() {
    const { app } = this;
    const client = new OAuth(app.config.authorization.appID, app.config.authorization.appSecret);

    // this.ctx.unsafeRedirect('http://www.baidu.com/');
    const url = client.getAuthorizeURL('http://vue.niuzhuangzhi.com', 'a', 'snsapi_base');

    console.log('-----------------------');
    console.log(url);
    console.log('-----------------------');


    this.ctx.body = url;
  }

  async serviceRedirect() {
    const { ctx } = this;
    ctx.redirect('http://www.baidu.com');
    // ctx.response.redirect('page');
  }
}

module.exports = HomeController;
