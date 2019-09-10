const net = require('net')
let server = net.createServer(sock =>{
  console.log('有人链接')
  sock.once('data', buffer => {
    console.log(buffer.toString())
  })
})