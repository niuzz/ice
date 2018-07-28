'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async api() {

    this.ctx.unsafeRedirect('http://www.baidu.com');
    this.ctx.body = 'api';
    // this.ctx.redirect('www.baidu.com');
  }
}

module.exports = HomeController;
