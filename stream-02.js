const fs = require('fs')
const zlib = require('zlib')
 
let rs = fs.createReadStream('hh.txt')
let gz = zlib.createGzip()
let ws = fs.createWriteStream('hh-clone.txt.gz')
rs.pipe(gz).pipe(ws) // 先流到gz去压缩再流到ws

