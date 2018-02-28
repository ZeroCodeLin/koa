const router = require('koa-router')();

router.get('/demo', async (ctx, next) => {
    ctx.response.body = `<h1>Hello koa2!</h1><h1>hahahahaha</h1>`
})

module.exports = router