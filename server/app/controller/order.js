'use strict';

const Controller = require('egg').Controller;

const Rule = {
  username: { type: 'string', required: false },
  date: { type: 'string', required: false },
  openid: { type: 'string', required: false },
  price: { type: 'number', required: false },
  orderType: { type: 'string', required: false }, // 预订类型，写真？宠物
  mobile: { type: 'string', required: false },
  status: { type: 'int', required: false },
};

class OrderController extends Controller {

  async getOrder() {
    const { ctx } = this;

    const payload = ctx.query;

    const orderList = await ctx.service.order.getOrder(payload);

    if (orderList) {
      if (orderList.length > 0) {
        ctx.helper.success({ ctx, res: orderList, msg: '获取成功' });
      } else {
        throw ({ message: '没有信息', status: '404' });
      }
    } else {
      throw ({ message: '没有信息', status: '404' });
    }

  }

  async createOrder() {
    const { ctx } = this;
    const order = ctx.request.body;

    if (!order.username || !order.mobile || !order.openid || !order.date || !order.orderType || !order.price || !order.timeRange) {
      throw ({ message: '参数错误', status: '400' });
    }

    ctx.validate(Rule, order);

    const result = await ctx.service.order.createOrder(order);

    if (result) {
      ctx.helper.success({ ctx, res: result, msg: '创建成功' });
    } else {
      throw ({ message: '存储失败', code: 500 });
    }
  }
}

module.exports = OrderController;
