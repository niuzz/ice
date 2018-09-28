'use strict';

const Service = require('egg').Service;

class DateService extends Service {
  async index() {
    const { ctx } = this;
    const list = [];
    const denyDate = await ctx.service.date.findAll(ctx.helper.getDate(0));
    console.log(denyDate);
    for (let i = 0; i < 30; i += 1) {
      const obj = {};
      const ndate = ctx.helper.getDate(i);
      let orders = await ctx.service.order.show({ date: { $gte: new Date(ndate), $lte: new Date(ndate) } });
      orders = orders.map(item => {
        switch (item.period) {
          case '10:00-11:00':
            item.period = 'AM';
            break;
          case '13:00-15:00':
            item.period = 'PM';
            break;
          default:
            break;
        }
        return item;
      });
      obj.date = ndate;
      obj.orders = orders;
      obj.orders.length >= 2 ? obj.can_order = false : obj.can_order = true;
      list.push(obj);
    }
    return list;
  }

  async create(payload) {
    const { ctx } = this;
    const res = await ctx.model.Date.create(payload);
    return res;
  }

  async update(payload) {
    const { ctx } = this;
    const { date, status } = payload;
    const res = await ctx.model.Date.findOneAndUpdate(date, { $set: { status } });
    return res;
  }

  async findAll(begin) {
    const { ctx } = this;
    const end = ctx.helper.getDate(30);
    const res = await ctx.model.Date.find({ date: { $gte: new Date(begin), $lte: new Date(end) } });
    return res;
  }
}

module.exports = DateService;
