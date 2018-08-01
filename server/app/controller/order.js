'use strict';

const Controller = require('egg').Controller;


class OrderController extends Controller {
  async getOrder() {
    const { ctx } = this;
    ctx.body = 'get order';
  }

  async createOrder() {
    const { ctx } = this;
    const order = ctx.request.body;
    ctx.body = JSON.stringify(order);
  }
}

module.exports = OrderController;
