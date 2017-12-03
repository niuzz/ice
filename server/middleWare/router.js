/**
 * Created by niuzz on 17/11/25.
 */
import Router from 'koa-router'
import config from '../conf'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

import '../wechat'

export const router = app => {
  const router = new Router()
  
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
