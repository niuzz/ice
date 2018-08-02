'use strict';

const Service = require('egg').Service;

class OrderServer extends Service {
  async createOrder(order) {
    console.log(order);
  }
}

module.exports = OrderServer;
