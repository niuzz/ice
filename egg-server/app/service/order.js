'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

  async index(payload) {
    const { ctx, app } = this;
    const { currentPage, search } = payload;
    const skip = (currentPage - 1) * app.config.pagesize;
    let total;
    if (search) {
      total = await ctx.model.Order.find({ uid: search }).exec();
    } else {
      total = await ctx.model.Order.find({}).exec();
    }
    const sum = total.length;
    if (search) {
      const list = await ctx.model.Order.aggregate([
        {
          $match: { uid: app.mongoose.Types.ObjectId(search) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'uid',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $skip: parseInt(skip) },
        { $limit: app.config.pagesize },
        { $sort: { date: -1 } },
      ]);
      const nlist = list.map(item => {
        const { nickName, _id } = item.user[0];
        item.user = { nickName, _id };
        return item;
      });
      return { list: nlist, sum, currentPage };
    }
    const list = await ctx.model.Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'uid',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $skip: parseInt(skip) },
      { $limit: app.config.pagesize },
      { $sort: { date: -1 } },
    ]);
    const nlist = list.map(item => {
      const { nickName, _id } = item.user[0];
      item.user = { nickName, _id };
      return item;
    });
    return { list: nlist, sum, currentPage };
  }

  async create(payload) {
    const { ctx } = this;
    const order = ctx.model.Order.create(payload);
    return order;
  }

  async show(payload) {
    const { ctx } = this;
    const orders = ctx.model.Order.find(payload);
    return orders;
  }
}

module.exports = OrderService;
