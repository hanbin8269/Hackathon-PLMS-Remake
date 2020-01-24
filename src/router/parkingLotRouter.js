import Router from 'koa-router';
import { CreateParkingLot } from 'controllers/parkingLot';

const parkingLotManage = new Router;

parkingLotManage.post('/create',CreateParkingLot);

const parkingLotRouter = new Router;

parkingLotRouter.use('/parking-lot',parkingLotManage.route());

module.exports = parkingLotRouter;
