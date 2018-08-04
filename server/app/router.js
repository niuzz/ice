'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/test', controller.home.api);
  router.get('/api/serviceRedirect', controller.home.serviceRedirect);

  router.get('/api/signature/', controller.wechat.signature);
  router.get('/api/oauth/', controller.wechat.oauth);
  router.get('/api/redirect/', controller.wechat.redirect);

  router.get('/api/order', controller.order.getOrder);
  router.post('/api/order', controller.order.createOrder);
};
