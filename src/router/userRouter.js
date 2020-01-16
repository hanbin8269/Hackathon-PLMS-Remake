import Router from 'koa-router';
import { Register } from 'controllers/auth';

const auth = new Router;

auth.post('/register',Register);

const userRouter = new Router;

userRouter.use('/auth',auth.routes());

module.exports = userRouter;