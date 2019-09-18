const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')

let server = new Koa()
server.listen(8080)

server.keys = [ // koa-session强制要求必须加密
  'ads',
  'dsa',
  'cds'
]
server.use(session({
  maxAge: 20*60*1000,  // session有效时间是20分钟
  renew: true // 表示session时间自动续签
}, server)) // 要把服务端的实例传给session

server.use(async ctx => {
  if(!ctx.session['view']) {
    ctx.session['view'] = 0
  }
  ctx.session['view'] ++
  ctx.body = `欢迎你第${ctx.session.view}次来访`
})