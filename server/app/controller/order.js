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
    await ctx.service.order.createOrder(order);
    ctx.helper.success({ ctx, res: 1, msg: 'hello' });
  }
}

module.exports = OrderController;
