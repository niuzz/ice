'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async api() {
    console.log(this.ctx.query);
    this.ctx.body = 'api111';
  }
}

module.exports = HomeController;
