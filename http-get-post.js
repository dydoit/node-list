const http = require('http')
const urlModule = require('url')
const querystrng = require('querystring')
const fs = require('fs')
let server = http.createServer((req, res) => {
    let path = '', get = {}, post = {}
    let {method, url} = req
    if(method == 'GET') {
        let result = urlModule.parse(url, true).query
        path = result.pathname
        get = result
        compolete()
        res.end()
    } else if(method == 'POST') {
        path = url
        let arr = []
        req.on('data', buffer => {
            arr.push(buffer)
        })
        req.on('end', err => {
            if(err) {
                console.log(err)
            } else {
                let res = Buffer.concat(arr)
                post = res.toStrng()
                compolete()
            }
        })
    }
    function compolete() {
        console.log(path, get, post)
    }
})
server.listen(3000)
