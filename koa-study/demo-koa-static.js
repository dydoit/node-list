const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
let server = new Koa()
let router = new Router()
server.listen(8080)

router.get('/user', async ctx => {

})
server.use(router.routes())
let staticRouter = new Router()
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, static('./static',{
  maxage: 60*86400*1000
}))
staticRouter.all(/(\.html)$/i, static('./static', {
  maxAge: 86400*1000
}))
staticRouter.all('', static('./static', { // 空字符串代表的是router的根路径
  maxAge: 20*86400*1000,
  index: '1.html'
}))
// server.use(static('./static', {
//   index: '1.html', // 默认是1.html
// }))
server.use(staticRouter.routes())

