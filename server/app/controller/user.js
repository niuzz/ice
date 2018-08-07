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
  }

  // 创建用户
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserCreateTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 修改用户
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserUpdateTransfer);
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

}

module.exports = UserController;
