const fs = require('fs')
let rs = fs.createReadStream('a.txt') // 读入流
let ws = fs.createWriteStream('b.txt') // 写入流
rs.pipe(ws) // 读入流pipe进写入流，就完成了一次复制
// 可以监听一些事件，详见node文档
rs.on('error', err =>{

})
ws.on('finish', () => {
  console.log('完成')
})