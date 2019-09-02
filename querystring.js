const querystring = require('querystring')
console.log(querystring.parse('a=1&b=2'))
console.log(querystring.stringify({a:1, b:2}))