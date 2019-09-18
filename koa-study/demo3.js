const koa = require('koa')
const Router = require('koa-router')

let server = new koa()
server.listen(8080)

let router = new Router()
router.get('/login', async ctx => {
  ctx.assert(ctx.query.username, 400, 'username is required') // 友好的提示
  ctx.assert(ctx.query.password, 400, 'password is required')
  ctx.body = 'aaa'
})
// router.get('/home', async ctx => {
//   ctx.state = 404
// })
router.get('/home', async ctx => {
  // ctx.redirect('/login') 重定向
  ctx.redirect('https://www.baidu.com') 
})
server.use(router.routes()) // use里面必须传个function