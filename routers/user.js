const router = require('koa-router')();
const sql = require('../dao/mysql-config')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'jwt demo'

const user = require('../dao/user')

router.post('/login', async (ctx, next) => {
    const name = ctx.request.body.name || '';
    
    const result = await user.login(ctx);
    if(result.isTrue){
        let userToken = {
            name: name
        }
        const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
        ctx.cookies.set("Authorization", token)
    }
    ctx.body = {
        ...result
    }
})

router.post('/register', async (ctx, next) => {
    const result = await user.register(ctx);

    ctx.body = {
        ...result
    }
})

router.get('/users/list', async (ctx, next) => {
    const result = await user.list(ctx);

    ctx.body = {
        ...result
    }
})

router.post('/users/update', async (ctx, next) => {
    const result = await user.updateInfo(ctx);

    ctx.body = {
        ...result
    }
})

module.exports = router