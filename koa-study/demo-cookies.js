const Koa = require('koa')
const server = new Koa()
server.keys = ['a','b','c'] // 循环加密，一般会用几千个key
server.use(async ctx=> {
  ctx.cookies.set('user', 'blue', {
    maxAge: 14*86400*1000,
    signed: true
  })
  console.log(ctx.cookies.get('user', {signed: true}))
  ctx.body = 'aaa'
})
server.listen(8080)