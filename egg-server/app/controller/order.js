'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.OrderCreateRule = {
      uid: { type: 'string', required: true, allowEmpty: false },
      type: { type: 'string', required: true, allowEmpty: false },
      date: { type: 'date', required: true, allowEmpty: false },
      period: { type: 'string', required: true, allowEmpty: false },
      deposite: { type: 'number', required: true, allowEmpty: false },
      mobile: { type: 'string' },
    };
  }

  async index() {
    const { ctx } = this;
    const payload = ctx.query;
    const res = await ctx.service.order.index(payload);
    if (res.list.length > 0) {
      ctx.helper.success(ctx, res);
    } else {
      ctx.helper.error(ctx, 404, '没有相关数据');
    }
  }

  async create() {
    const { ctx } = this;
    const payload = ctx.request.body;
    ctx.validate(this.OrderCreateRule, payload);
    const res = await ctx.service.order.create(payload);
    ctx.helper.success(ctx, res);
  }
}

module.exports = OrderController;
