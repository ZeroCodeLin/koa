const Koa = require('koa');

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')

const user = require('./routers/user');
const secret = 'jwt demo'

app.use(function(ctx, next){
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    });
  });
app.use(bodyParser())

// app.use(jwtKoa({secret}).unless({
//     path: [/^\/login/,/^\/register/] //数组中的路径不需要通过jwt验证
// }))

// logger
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// routes

// app.use(router.routes());
app.use(user.routes());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3000);

console.log('app started at port 3000')


// const Koa = require('koa')
// const Router = require('koa-router')
// const bodyParser = require('koa-bodyparser')
// const jwt = require('jsonwebtoken')
// const jwtKoa = require('koa-jwt')
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
// const secret = 'jwt demo'
// const app = new Koa()
// const router = new Router()
// app.use(bodyParser())
// app.use(jwtKoa({secret}).unless({
//         path: [/^\/api\/login/] //数组中的路径不需要通过jwt验证
//     }))
// router.post('/api/login', async (ctx, next) => {
//         const user = ctx.request.body
//         if(user && user.name) {
//             let userToken = {
//                 name: user.name
//             }
//             const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
//             ctx.body = {
//                 message: '获取token成功',
//                 code: 1,
//                 token
//             }
//         } else {
//             ctx.body = {
//                 message: '参数错误',
//                 code: -1
//             }
//         }
//     })
    
// app
//     .use(router.routes())
//     .use(router.allowedMethods())
// app.listen(3000, () => {
//     console.log('app listening 3000...')
// })
