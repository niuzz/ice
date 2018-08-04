'use strict';

const Service = require('egg').Service;

class OrderServer extends Service {
  async createOrder(payload) {
    const { ctx } = this;

    return ctx.model.Order.saveOrder(payload);
  }
}

module.exports = OrderServer;
