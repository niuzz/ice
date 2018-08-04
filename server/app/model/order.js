'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.connect('mongodb://127.0.0.1:27017/sandra');
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
    date: { type: String },
    username: { type: String },
    openid: { type: String },
    price: { type: Number },
    orderType: { type: String }, // 预订类型，写真？宠物
    mobile: { type: String },
    meta: {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  });

  OrderSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
      this.meta.updatedAt = Date.now();
    }
    next();
  });

  OrderSchema.statics = {
    async getOrder(date) {
      const order = await this.findOne({ date }).exec();
      return order;
    },
    async getAll() {
      return this.find().exec();
    },
    async saveOrder(data) {
      let order = await this.findOne({ date: data.date }).exec();
      if (order) {
        order = data;
      } else {
        // eslint-disable-next-line
        order = new Order(data);
        console.log(order);
      }
      try {
        await order.save();
        console.log('存储成功，order.id' + order._id);
      } catch (e) {
        console.log('存储失败');
        console.log(e);
      }
    },
  };

  const Order = mongoose.model('Order', OrderSchema);

  return Order;
};
