const path = require('path')
module.exports = {
  // database
  DB_HOST: '127.0.0.1',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: '',
  DB_NAME: '20190917',
  // http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload/')
}