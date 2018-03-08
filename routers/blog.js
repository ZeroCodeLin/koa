const router = require('koa-router')();
const sql = require('../dao/mysql-config')
const blog = require('../dao/blog')


router.get('/blog/detail/:id', async (ctx, next) => {
    const result = await blog.detail(ctx);

    ctx.body = {
        ...result
    }
})


router.post('/blog/lists', async (ctx, next) => {
    const result = await blog.lists(ctx);

    ctx.body = {
        ...result
    }
})

router.post('/blog/write', async (ctx, next) => {
    const result = await blog.write(ctx);

    ctx.body = {
        ...result
    }
})

module.exports = router