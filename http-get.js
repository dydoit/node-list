const http = require('http')
const url = require('url')
let server = http.createServer((req, res) => {
    // let {url } = req
    // console.log(url)
    let result = url.parse(req.url, true)
   
    // console.log(result)
    // console.log(result.query)
    let {username, password} = result.query
    console.log('username', username)
    console.log('password', password)
    res.end('1')
})
server.listen(3000)