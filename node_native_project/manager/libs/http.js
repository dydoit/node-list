const http = require('http')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const fs = require('fs')
const router = require('./router')
const {Form} = require('multiparty')
const {HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD} = require('../config')
http.createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*')
  res.writeJson = (json) => {
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify(json))
  }
  // 解析数据- GET、POST、FILE
  let {pathname, query} = url.parse(req.url, true)
  if(req.method == 'POST') {
    if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')){
      // 普通POST
      let arr = []
      req.on('data', buffer => {
        arr.push(buffer)
      })
      req.on('end', () =>{
        let post = querystring.parse(Buffer.concat(arr).toString())
        // 找路由
        handle(req.method, pathname, query, post, {})
      })
    }else {
      // 文件POST
      let form = new Form({
        uploadDir: HTTP_UPLOAD
      })
      form.parse(req)
      let post = {}
      let files = {}
      form.on('field', (name, value) => {
        post[name] = value
      })
      form.on('file', (name, file) => {
        files[name] = file
      })
      form.on('error', err => {
        console.log(err)
      })
      form.on('close', () =>{
        handle(req.method, pathname, query, post ,files)
      })
    }
  }else {
    // handle(req.method, pathname, query, {}, {})
    let filepath = HTTP_ROOT+pathname
    fs.stat(filepath, err => {
      if(err) {
        // res.setHeader('content-encoding', 'deflate') :表示返回的是二进制数据，不写则默认给啥返回啥
        res.writeHead(404)
        res.write('not found')
        res.end()
      } else {
        res.setHeader('content-encoding', 'gzip') // 一定要告诉浏览器后端开启了压缩
        let rs = fs.createReadStream(filepath)
        rs.on('error', err=> {})
        let gz = zlib.createGzip()
        // rs.pipe(res)
        rs.pipe(gz).pipe(res)
      }
    })

  }
  async function handle(method, url, get, post, files) {
    let fn = router.findRouter(method, url)
    if(!fn) {
      // 是文件
      let filepath = HTTP_ROOT+pathname
      fs.stat(filepath, (err, stat) => {
        if(err) {
          res.writeHeader(404)
          res.write('Not Found')
          res.end()
        }else {
          res.setHeader('content-encording', 'gzip')
          let rs = fs.createReadStream(filepath)
          let gz = zlib.createGzip()
          rs.on('error', (e)=> {console.log('出错')})
          rs.pipe(gz).pipe(res)
        }
      })
    }else { // 接口
      try{
        await fn(res, get, post, files)
      }catch(e) {
        console.log(e)
        res.writeHeader(500)
        res.write('Internal Server Error')
        res.end()
      }
     }
  }
}).listen(HTTP_PORT)
console.log(`server started at ${HTTP_PORT}`)
