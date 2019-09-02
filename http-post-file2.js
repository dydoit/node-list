const http = require('http')
const util = require('util')
const fs = require('fs')
const multiparty = require('multiparty')
http.createServer((req, res) => {
  console.log(req.url)
  if(req.url == '/upload') {
    var form = new multiparty.Form()
    //设置编辑
    form.encoding = 'utf-8'
    //设置文件存储路径 : 路径文件夹必须先存在
    form.uploadDir = 'upload/'
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    form.on('file', (name, value) => {
      console.log('触发没')
      console.log(name, value)
    })
    form.parse(req, (err, fileds, files) => {
      if(err) {
        console.log(err)
      }
      console.log(fileds)
      console.log(files)
      res.writeHead(200, {'content-type': 'text/plain'})
      res.write('received upload')
      res.end(util.inspect({fileds: fileds, files: files}))
    })
  }
 
}).listen(3000)