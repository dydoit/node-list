const http = require('http')
const io = require('socket.io')
// 1. 建立普通http请求
let server = http.createServer((req, res) => {})
server.listen(8080)
// 2.建立ws
let wsServer = io.listen(server)
wsServer.on('connection', sock => {
    // 可以主动发数据 sock.emit('name',数据)
    // 也可以几首数据 sock.on('客户端传过来的事件名', function(客户端传过来的数据){})
    sock.on('aaa', (a, b) => {
        console.log(a, b, a+b)
    })
})