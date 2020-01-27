import Router from 'koa-router';
import { CreateParkingLot, UpdateParkingLot } from 'controllers/parkingLot';

const parkingLotManage = new Router;

parkingLotManage.post('/create',CreateParkingLot);
parkingLotManage.post('/update',UpdateParkingLot);


const parkingLotRouter = new Router;

parkingLotRouter.use('/parking-lot',parkingLotManage.routes());

module.exports = parkingLotRouter;
