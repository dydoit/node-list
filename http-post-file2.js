const http = require('http')
const util = require('util')
const multiparty = require('multiparty')
http.createServer((req, res) => {
  var form = new multiparty.Form({
    uploadDir: './upload'
  })
  res.writeHead(200, {'content-type': 'text/plain'})
  res.end('ok')
}).listen(3000)