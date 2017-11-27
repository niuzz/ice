/**
 * Created by niuzz on 17/11/26.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
  name: String,
  token: String,
  expires_in: Number,
  meta: {
    createdAT: {
      type: Date,
      default: Date.now()
    },
    updatedAT: {
      type: Date,
      default: Date.now()
    }
  }
})

TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAT = this.meta.updatedAT = Date.now()
  } else {
    this.meta.updatedAT = Date.now()
  }
  next()
})

TokenSchema.statics = {
  async getAccessToken () {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()
  },
  async saveAccessToken (data) {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()
    if (token) {
      token.token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        token: data.access_token,
        expires_in: data.expires_in
      })
    }
    await token.save()
    return data
  }
}
const Token = mongoose.model('Token', TokenSchema)
