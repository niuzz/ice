'use strict';

const Controller = require('egg').Controller;


class OrderController extends Controller {
  async getOrder() {
    const { ctx } = this;

    const orderList = await ctx.service.order.getOrder();

    if (orderList) {
      ctx.helper.success({ ctx, res: orderList, msg: '获取成功' });
    } else {
      ctx.throw({ message: '没有信息', code: 501 });
    }

  }

  async createOrder() {
    const { ctx } = this;
    const order = ctx.request.body;

    const Rule = {
      date: { type: 'string' },
      username: { type: 'string' },
      openid: { type: 'string' },
      price: { type: 'number' },
      orderType: { type: 'string' }, // 预订类型，写真？宠物
      mobile: { type: 'string' },
    };

    ctx.validate(Rule, order);

    const result = await ctx.service.order.createOrder(order);
    ctx.helper.success({ ctx, res: result, msg: '创建成功' });

  }
}

module.exports = OrderController;
