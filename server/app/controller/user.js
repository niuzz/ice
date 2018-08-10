'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.UserCreateRule = {
      mobile: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/ },
    };

    this.UserUpdateRule = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/ },
    };

    this.UserLoginRule = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };

    this.UserResetPswRule = {
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      oldPassword: { type: 'password', required: true, allowEmpty: false, min: 6 },
    };

    this.UserUpdateRule = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/ },
    };
  }

  // 创建用户
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserCreateRule);
    // 组装参数
    const payload = ctx.request.body || {};

    const user = await service.user.findByMobile(payload.mobile);
    if (user) {
      ctx.throw(422, '手机已注册');
    }
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 修改用户
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserUpdateRule);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.user.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.user.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取所有用户(分页/模糊)
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // ==================================  user access  ======================================== //

  // 用户登入
  async login() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserLoginRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.login(payload);

    ctx.cookies.set('token', res.token, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: false, overwrite: true, signed: false });

    delete res.token;
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 用户登出
  async logout() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    await service.user.logout();
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  // 修改密码
  async resetPsw() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserResetPswRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.user.resetPsw(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  // 获取用户信息
  async current() {
    const { ctx, service } = this;
    const res = await service.user.current();
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 修改基础信息
  async resetSelf() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserUpdateRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用Service 进行业务处理
    await service.user.resetSelf(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

}

module.exports = UserController;
