const Koa = require('koa');

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const index = require('./routers/index')

app.use(bodyParser())
// logger
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// routes
app.use(index.routes());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3000);

console.log('app started at port 3000')