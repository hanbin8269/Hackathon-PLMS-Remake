const Koa = require('Koa');
const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(4000,() => {
    console.log('server on!');
});