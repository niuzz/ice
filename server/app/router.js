'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/wechat-hear', controller.wechat.hear);
  router.get('/get-client', controller.wechat.getClient);
  router.get('/mo', controller.wechat.mo);
};
