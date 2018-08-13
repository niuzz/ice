'use strict';

const Controller = require('egg').Controller;

class MinaController extends Controller {

  async create() {
    const { ctx } = this;
    const code = ctx.request.body.code;

    const result = await ctx.service.mina.create(code);
    ctx.helper.success({ ctx, res: result });

  }
}

module.exports = MinaController;
