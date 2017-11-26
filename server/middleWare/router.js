/**
 * Created by niuzz on 17/11/25.
 */
import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../conf'
export const router = app => {
  const router = new Router()
  router.get('/wechat-hear', (ctx, next) => {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    if (sha === signature) {
      console.log(true)
      ctx.body = echostr
    } else {
      ctx.body = 'fail'
    }
  })
  /* router.post('/wechat-hear', (ctx, next) {
  }) */
  app.use(router.routes())
  app.use(router.allowedMethods())
}
