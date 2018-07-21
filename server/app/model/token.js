'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.connect('mongodb://127.0.0.1:27017/sandra');
  const Schema = mongoose.Schema;

  const TokenSchema = new Schema({
    name: { type: String },
    access_token: { type: String },
    expires_in: { type: Number },
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

  TokenSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
      this.meta.updatedAt = Date.now();
    }
    next();
  });

  TokenSchema.statics = {

    async getAccessToken() {
      const token = await this.findOne({ name: 'access_token' }).exec();
      return token;
    },

    async saveAccessToken(data) {
      let token = await this.findOne({ name: 'access_token' }).exec();
      if (token) {
        token.access_token = data.access_token;
        token.expires_in = data.expires_in;
      } else {
        // eslint-disable-next-line
        token = new Token({
          name: 'access_token',
          expires_in: data.expires_in,
          access_token: data.access_token,
        });
        console.log(token);
      }
      try {
        await token.save();
        console.log('存储成功, access_token: ' + token.access_token);
      } catch (e) {
        console.log('存储失败');
        console.log(e);
      }

      return data;
    },
  };

  const Token = mongoose.model('Token', TokenSchema);
};
