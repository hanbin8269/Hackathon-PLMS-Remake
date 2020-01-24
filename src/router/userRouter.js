// import Router from 'koa-router';
// import { Register } from 'controllers/auth';
const Router = require('koa-router');
const { Register, Login } = require('controllers/auth');

const auth = new Router;

auth.post('/register',Register);
auth.post('/login',Login);

const userRouter = new Router;

userRouter.use('/auth',auth.routes());

module.exports = userRouter;