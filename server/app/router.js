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

  router.post('/api/user/login', controller.user.login);
  router.post('/api/user', controller.user.create);

  router.get('/api/order', controller.order.getOrder);
  router.post('/api/order', controller.order.createOrder);

  router.post('/api/role', controller.role.create);
  router.get('/api/role/:id', controller.role.show);
  router.get('/api/role', controller.role.index);
  router.put('/api/role/:id', controller.role.update);
  router.delete('/api/role/:id', controller.role.destroy);

  router.post('/api/mina', controller.mina.login);
};
