'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

  async index(payload) {
    const { ctx, app } = this;
    const { currentPage, search } = payload;
    const skip = (currentPage - 1) * app.config.pagesize;
    if (search) {
      console.log(search);
      console.log(skip);
    } else {
      const list = await ctx.model.Order.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'uid',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]);
      const nlist = list.map(item => {
        const { nickName, _id } = item.user[0];
        item.user = { nickName, _id };
        return item;
      });
      return nlist;
    }
  }

  async create(payload) {
    const { ctx } = this;
    console.log(payload);
    const order = ctx.model.Order.create(payload);
    return order;
  }
}

module.exports = OrderService;
