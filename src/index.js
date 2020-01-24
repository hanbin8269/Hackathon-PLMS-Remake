import Koa from 'koa';
import bodyparser from 'koa-bodyparser'
import userRoute from 'router/userRouter';
import parkingLotRouter from 'router/parkingLotRouter';
import { sequelize } from 'models'
sequelize.sync()

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(bodyparser())
.use(userRoute.routes()).use(userRoute.allowedMethods())
.use(parkingLotRouter.routes()).use(parkingLotRouter.allowedMethods())


app.listen(port,()=>{
    console.log('server on');
});