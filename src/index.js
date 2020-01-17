import Koa from 'koa';
import bodyparser from 'koa-bodyparser'
import userRoute from 'router/userRouter';

import { sequelize } from 'models'
sequelize.sync()

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(bodyparser())
app.use(userRoute.routes()).use(userRoute.allowedMethods());

app.listen(port,()=>{
    console.log('server on');
});