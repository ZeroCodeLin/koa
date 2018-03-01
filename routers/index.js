const router = require('koa-router')();
const sql = require('../dao/config')

router.get('/demo', async (ctx, next) => {
    const name = await sql.query('select * from demo;').then(function(result) {
        console.log(result);
        const arr = JSON.stringify(result)
        return arr;
      }, function(error){
        return -1;
      });

    ctx.response.body = `<h1>Hello koa2!</h1><h1>${name}</h1>`

  
})

module.exports = router