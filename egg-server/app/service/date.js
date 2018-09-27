'use strict';

const Service = require('egg').Service;

class DateService extends Service {
  async index() {
    const { ctx } = this;
    const list = [];
    for (let i = 0; i < 30; i += 1) {
      const obj = {};
      const ndate = ctx.helper.getDate(i);
      const is_order = await ctx.service.order.show({ Date: { $gte: new Date(ndate), $lte: new Date(ndate) } });
      obj.date = ndate;
      obj.orders = is_order;
      obj.orders.length >= 2 ? obj.can_order = false : obj.can_order = true;
      list.push(obj);
    }
    return list;
  }
}

module.exports = DateService;
