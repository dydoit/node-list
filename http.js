const fs = require('fs')
fs.writeFile('./a.txt', 'write', (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log('写入成功')
    }

})
let content = ''
fs.readFile('./a.txt', (err, data) => {
    if(err) {
        console.log(err)
    }else {
        console.log(data)
        content = data
    }
})
const http = require('http')
let server = http.createServer((req, res) => {
    res.write('hello')
    res.end(content)
})
server.listen(8080)