const koa = require('koa')
const Router = require('koa-router')

let server = new koa()
server.listen(8080)

let router = new Router()
router.get('/a', async ctx => {
  ctx.body = 'aaa'
})
server.use(router.routes()) // use里面必须传个function