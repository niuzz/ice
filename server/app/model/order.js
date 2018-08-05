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

  const Order = mongoose.model('Order', OrderSchema);

  return Order;
};
