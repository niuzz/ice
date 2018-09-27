'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.connect('mongodb://127.0.0.1:27017/sandra');
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    uid: { type: mongoose.Schema.ObjectId, required: true },
    type: { type: String, required: true },
    deposite: { type: Number, required: true },
    Date: { type: Date, required: true },
    period: { type: String, required: true },
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

  return mongoose.model('Order', OrderSchema);
};
