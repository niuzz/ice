'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.connect('mongodb://127.0.0.1:27017/sandra');
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    openid: { type: String, unique: true, required: true },
    session_key: { type: String, unique: true, required: true },
    nickName: { type: String },
    gender: { type: String },
    language: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    avatarUrl: { type: String },
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

  UserSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
      this.meta.updatedAt = Date.now();
    }
    next();
  });

  return mongoose.model('User', UserSchema);
};
