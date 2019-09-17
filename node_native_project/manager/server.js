const db = require('./libs/database')
require('./libs/http')
const {addRouter} = require('./libs/router')
addRouter('get', '/list', async(res, get, post, files) => {
  try {
    let data = await db.query(`SELECT * FROM shop_list ORDER BY id desc`);
    res.writeJson({error:0, data})
  }catch(e) {
    console.log(e)
    res.writeJson({error:1, msg: 'database error'})
  }
  res.end()
})
addRouter('post', '/add', async(res, get, post, files) => {
  let {prod_name, price, total} = post
  if(!prod_name || !price|| !total) {
    res.writeJson({error:1, msg: 'params invalid'})
    res.end()
  }else {
    price = Number(price)
    total = Number(total)
    if(isNaN(price) || isNaN(total)) {
      res.writeJson({error: 1, msg: 'params invalid'})
      res.end()
    } else {
      try{
        await db.query(`INSERT INTO shop_list (prod_name, price, total) VALUES(?,?,?)`, [prod_name, price, total])
        res.writeJson({error:0, msg: '成功'})
      }catch(e) {
        console.log(e)
        res.writeJson({error: 1, msg: 'database error'})
      }
    }
  }
  res.end()
})
addRouter('get', '/del', async(res, get, post,files) => {
  let {id} = get
  if (!id) {
    res.writeJson({error: 1, msg: 'parmams error'})
    res.end()
  } else {
    try {
      await db.query(`DELETE FROM shop_list WHERE id=${id}`)
      res.writeJson({error: 0, msg:'删除成功'})

    }catch(e) {
      console.log(e)
    }
  }
  res.end()
})
addRouter('get', '/index.html')