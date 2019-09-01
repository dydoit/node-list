const fs = require('fs')
const http = require('http')
let server = http.createServer((req, res) => {
    let { url } = req
    if(url == '/1.html') {
        fs.readFile(`www${url}`, (err, buffer) => {
            if(err) {
                console.log(err)
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(buffer) // 直接返回二进制数据
                res.end()
            }
        })    
    }
})
server.listen(3000)