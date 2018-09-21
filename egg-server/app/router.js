'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 公众号验证
  // router.get('/wechat-auth', controller.auth.listen);
  router.get('/api/user', controller.user.index);
  router.post('/api/user', controller.user.create);
};
