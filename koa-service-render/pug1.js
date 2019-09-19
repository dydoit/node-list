const pug = require('pug')

pug.renderFile('./template/1.pug', {
  pretty:  true,
  title: 'aaa'
}, (err, data) => {
  if(err) {
    console.log('渲染失败')
  }else {
    console.log(data)
  }
})