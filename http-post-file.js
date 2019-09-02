const http = require('http')
const fs = require('fs')
let server = http.createServer((req, res) => {
  console.log('headers', req.headers)
  let arr = []
  req.on('data', buffer => {
    arr.push(buffer)
  })
  req.on('end', () => {
    let result = Buffer.concat(arr)
    // console.log(result.toString())
  })
  res.end('ok')
})
server.listen(3000)
