const net = require('net') // 就是原始的tcp连接
const crypto = require('crypto')
// 需要手动完成握手的环节
function parseHeader(str) {
    let arr = str.split('\r\n').filter(line => line)
    arr.shift()
    let header = {}
    arr.forEach(item => {
        let [name, value] = item.split(':')
        name = name.trim().toLowerCase()
        value = value.trim()
        header[name] = value
    });
    return header
}
let server = net.createServer(sock => {
    sock.once('data', buffer => {
        let str = buffer.toString() 
        /*
        str内容：
        GET / HTTP/1.1
        Host: localhost:8080
        Connection: Upgrade
        Pragma: no-cache
        Cache-Control: no-cache
        User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
        Upgrade: websocket
        Origin: file://
        Sec-WebSocket-Version: 13
        Accept-Encoding: gzip, deflate, br
        Accept-Language: zh-CN,zh;q=0.9
        Sec-WebSocket-Key: /kDzh+46ZZNkYKgnP0JLlw==
        Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
        */
        let headerObj = parseHeader(str)
        if(headerObj['upgrade']!= 'websocket') {
            console.log('no upgrade')
            sock.end()
        }else if(headerObj['sec-websocket-version']!='13') {
            console.log('你和我版本不一致')
            sock.end()
        }else {
            let key = headerObj['sec-websocket-key']
            let uuid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
            let hash = crypto.createHash('sha1')
            hash.update(key+uuid)
            let key2 = hash.digest('base64')
            sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection:upgrade\r\nSec-Websocket-Accept:${key2}\r\n\r\n)`) // 括号里的代码不能换行
        }

    })
    sock.on('end', () => {
        console.log('已断开')
    })
})
server.listen(8080)