const router = require('koa-router')();
const sql = require('../dao/mysql-config')
const essay = require('../dao/essay')


router.get('/essay/detail/:id', async (ctx, next) => {
    const result = await essay.detail(ctx);

    ctx.body = {
        ...result
    }
})


router.post('/essay/lists', async (ctx, next) => {
    const result = await essay.lists(ctx);

    ctx.body = {
        ...result
    }
})

router.post('/essay/write', async (ctx, next) => {
    const result = await essay.write(ctx);

    ctx.body = {
        ...result
    }
})

module.exports = router