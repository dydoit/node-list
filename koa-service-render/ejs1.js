const ejs = require('ejs')
ejs.renderFile('./tempalte/1.ejs', {
  name:'张三',
}, (err, data) => {
  if(err) {
    console.log(err)
  }else {
    console.log(data)
  }
})