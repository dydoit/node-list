const process = require('process')
// if(process.env === 'Windows_NT') { //说明是开发模式

// }
let mode = process.env === 'Windows_NT'? 'develope': 'product'
module.exports = {
  mode,
  ...mode=='develope'?require('./config.dev'):require('./config.prod')
}