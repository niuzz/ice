'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async create() {
    const { ctx } = this;
    const payload = console.log(ctx.request.body);
    console.log(payload);
  }
}

module.exports = OrderController;
