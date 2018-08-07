'use strict';

const Service = require('egg').Service;

class User extends Service {


  async create(payload) {
    const { ctx, service } = this;
    const role = await service.role.show(payload.role);
    if (!role) {
      ctx.throw(404, 'role is not found');
    }
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  // <===============================  access ======================================> //

  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(payload.mobile);
    if (!user) {
      ctx.throw(404, 'user not found');
    }

    const verifyPsw = await ctx.compare(payload.password, user.password);

    if (!verifyPsw) {
      ctx.throw(404, 'user password is error');
    }
    // 生成Token令牌

    return { token: await service.actionToken.apply(user._id) };
  }

  async logout() {
    return false;
  }

  async resetPsw(values) {
    const { ctx, service } = this;
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }

    const verifyPsw = await ctx.compare(values.oldPassword, user.password);
    if (!verifyPsw) {
      ctx.throw(404, 'user password error');
    } else {
      // 重置密码
      values.password = await ctx.genHash(values.password);
      return service.user.findByIdAndUpdate(_id, values);
    }
  }

  async current() {
    const { ctx, service } = this;
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    user.password = 'How old are you?';
    return user;
  }

  // 修改个人信息
  async resetSelf(values) {
    const { ctx, service } = this;
    // 获取当前用户
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    return service.user.findByIdAndUpdate(_id, values);
  }

  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile });
  }

  async find(id) {
    return this.ctx.model.User.findById(id);
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }

}

module.exports = User;
