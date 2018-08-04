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
    const result = await ctx.service.order.createOrder(order);
    ctx.helper.success({ ctx, res: result, msg: '创建成功' });
  }
}

module.exports = OrderController;
