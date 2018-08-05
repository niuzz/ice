'use strict';

const Service = require('egg').Service;

class OrderServer extends Service {

  // ======================== create ============================ //
  async create(payload) {
    const { ctx } = this;

    const order = new ctx.model.Order(payload);
    try {
      const o = await order.save();
      return o;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async show(payload) {
    const { ctx } = this;

    return ctx.model.Order.find(payload).exec();
  }
}

module.exports = OrderServer;
