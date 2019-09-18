const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-better-body')

const server = new Koa()
const router = new Router()
server.listen(8080)
server.use(body({
  uploadDir: './static/upload'
}))
router.post('/upload', async ctx =>{
  console.log(ctx.request.fields) // 包含前端post的所有数据，包含普通数据和长传的文件
  ctx.body = '提交成功'
})
server.use(router.routes())