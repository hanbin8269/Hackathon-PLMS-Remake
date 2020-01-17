// import Router from 'koa-router';
// import { Register } from 'controllers/auth';
const Router = require('koa-router');
const { Register } = require('controllers/auth');

const auth = new Router;

auth.post('/register',Register);
auth.get('/test',  (ctx, next) => {
    ctx.body = '홈';
});
const userRouter = new Router;

userRouter.use('/auth',auth.routes());

module.exports = userRouter;