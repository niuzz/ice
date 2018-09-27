'use strict';

const Controller = require('egg').Controller;

class DateController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.date.index();
    ctx.helper.success(ctx, res);
  }
}

module.exports = DateController;
