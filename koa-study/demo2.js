const koa = require('koa')
const Router = require('koa-router')

let server = new koa()
server.listen(8080)

let router = new Router()
router.get('/a', async ctx => {
  console.log(ctx.method)
  console.log(ctx.url)
  console.log(ctx.query) // {id:'2'}
  console.log(ctx.path)
  console.log(ctx.ip)
  ctx.body = ctx
})
router.get('/a/:id', async (ctx, next) => { // localhost:8080/a/123
  // console.log(ctx.params) {id: '123'}
  ctx.body = ctx.params
  await next() // 要用await
})
router.get('/a/1', async ctx =>{
  ctx.body = ''
})
router.get('/a/:id/:id2/:id3', async ctx => { // localhost:8080/a/1/2/3
  // console.log(ctx.params) {id: '1', id2: '2', id3:'3'}
})
server.use(router.routes()) // use里面必须传个function