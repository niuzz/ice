'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/listen', controller.officialAccounts.listen);
  router.post('/api/mina', controller.mina.create);
};
