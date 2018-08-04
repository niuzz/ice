'use strict';

const Service = require('egg').Service;

class OrderServer extends Service {
  async createOrder(payload) {
    const { ctx } = this;
    return ctx.model.User.create(payload);
  }
}

module.exports = OrderServer;
