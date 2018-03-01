const router = require('koa-router')();
const sql = require('../dao/config')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'jwt demo'

router.get('/login', async (ctx, next) => {
    
    let userToken = {
        name: "lemon"
    }
    const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
    ctx.body = {
        message: '获取token成功',
        code: 1,
        token
    }
    ctx.cookies.set("Authorization", token)
})
router.get('/user', async (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = {
        message: '获取token成功',
    }
})
router.get('/test', async (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = {
        message: '获取token成功',
    }
})

module.exports = router