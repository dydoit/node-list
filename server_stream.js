const http = require('http')
const zlib = require('zlib')
const url = require('url')
const fs = require('fs')
http.createServer((req, res) => {
  let {pathname} = url.parse(req.url, true)
  fs.stat('./'+pathname, err => {
    if(err) {
      // res.setHeader('content-encoding', 'deflate') :表示返回的是二进制数据，不写则默认给啥返回啥
      res.writeHead(404)
      res.write('not found')
      res.end()
    } else {
      res.setHeader('content-encoding', 'gzip') // 一定要告诉浏览器后端开启了压缩
      let rs = fs.createReadStream('./'+pathname)
      rs.on('error', err=> {})
      let gz = zlib.createGzip()
      // rs.pipe(res)
      rs.pipe(gz).pipe(res)
    }
  })
}).listen(8080)
