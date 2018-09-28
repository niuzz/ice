'use strict';

const Controller = require('egg').Controller;

class DateController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.DateCreateRule = {
      date: { type: 'date', required: true, allowEmpty: false },
      status: { type: 'boolean', required: true, allowEmpty: false },
    };
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.service.date.index();
    ctx.helper.success(ctx, res);
  }

  async update() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.date.update(payload);
    ctx.helper.success(ctx, res);
  }

  async create() {
    const { ctx } = this;
    const payload = ctx.request.body;
    ctx.validate(this.DateCreateRule, payload);
    const res = await ctx.service.date.create(payload);
    ctx.helper.success(ctx, res);
  }
}

module.exports = DateController;
