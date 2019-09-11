const http = require('http')
const mysql = require('mysql')
const url = require('url')
const co = require('co-mysql')
// 1. 连接到服务器，下面是最简单最低效的连接
// let db = mysql.createConnection({host: '127.0.0.1', user: 'root', password: '', database: '20190718'})
// 优化，建立连接池
let cnn = mysql.createPool({
  connectionLimit: 10, // 最大连接数，不给默认是10个
  host: '127.0.0.1',
  user: 'root',
  password: '', database: '20190718'
})
// 包装一下
let db = co(cnn)
// 2. 配合http
http.createServer(async (req, res) => {
  const {pathname, query} = url.parse(req.url, true)
  res.setHeader('access-control-allow-origin', '*')
  if(pathname == '/reg') {
    // 检查用户是否已存在, 不存在则插入
    let {username, password} = query
    if(!username || !password) {
      res.write('用户名和密码不能为空')
      res.end()
    }else if(password.length>32) {
      res.write('密码最大32个字符')
      res.end()
    }else {
      // 此处有坑，必须用单引号包裹
      try{
        let data = await db.query(`SELECT ID FROM user_table WHERE username='${username}'`)
        if(data.length>0) {
          res.write('此用户名已被占用')
         
        }else {
          await db.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`)
          res.write('注册成功')
        }
      }catch(e) {
        console.log('数据库出错')
      }
      res.end()
    }
  }else if(pathname == '/login') {

  }else{

  }
}).listen(8080)
