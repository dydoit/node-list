const process = require('process')
let mode = process.env.os === 'Windows_NT'? 'develope': 'product'
module.exports = {
  mode,
  ...mode=='develope'?require('./config.dev'):require('./config.prod')
}