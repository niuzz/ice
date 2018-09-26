'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

  async index(payload) {
    const { ctx } = this;
    const list = ctx.model.Order.find(payload);
    return list;
  }

  async create(payload) {
    const { ctx } = this;
    const order = ctx.model.Order.create(payload);
    return order;
  }
}

module.exports = OrderService;
