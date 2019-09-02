const path = require('path')
let str = '/root/demo/1.html'
console.log(path.dirname(str)) // 打印的是目录名
console.log(path.extname(str)) // 打印的扩展名, str最后.之后的内容 
console.log(path.basename(str)) // 返回文件名 1.html
console.log(path.join('/foo', '//bar', '..')) // 返回/foo
// path.resolve: 将路径解析为绝对路径
console.log(path.resolve('/foo')) // 返回： E:\foo
// path.parse(str) : 解析str返回一个对象
console.log(path.parse('/foo/bar/1.html')) // {root: '/', dir: '/foo/bar', base: '1.html', ext: '.html', name: '1'} 