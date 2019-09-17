const url = require('url')
let str = 'http://www.baidu.com?a=1&a=2'
console.log(url.parse(str))
// console.log(url.parse(str, true))