'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async create(payload) {
    console.log(payload);
  }
}

module.exports = OrderService;
