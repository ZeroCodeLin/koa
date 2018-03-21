const Koa = require('koa');
const views = require('koa-views');

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')

const user = require('./routers/user');
const blog = require('./routers/blog');
const secret = 'jwt demo'
var staticServer = require("koa-static");

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
app.use(staticServer(__dirname + '/public',{
  maxage: 100000
}));
app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// routes

// app.use(router.routes());
app.use(user.routes());
app.use(blog.routes());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(80);

console.log('app started at port 3000')
