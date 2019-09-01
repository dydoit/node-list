// post数据不会一次性给，是分段给的，所以也要分段接
// get的数据走的是url，post的数据走的是请求体body
const http = require('http')
const url = require('url')
let server = http.createServer((req, res) => {
    let arr = []
    req.on('data', buffer => { // 分段接受中
        arr.push(buffer)
    })
    req.on('end', () => { // 接受完毕
        let buffer = Buffer.concat(arr)
        console.log(buffer.toString())
    })
    res.end()
})
server.listen(3000)