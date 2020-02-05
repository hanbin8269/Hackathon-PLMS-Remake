import Router from 'koa-router';
import {ReadParkingLot, CreateParkingLot, UpdateParkingLot, DeleteParkingLot } from 'controllers/parkingLot';

const parkingLotManage = new Router;

parkingLotManage.post('/create',CreateParkingLot);
parkingLotManage.put('/update',UpdateParkingLot);
parkingLotManage.delete('/delete',DeleteParkingLot);
parkingLotManage.get('/read',ReadParkingLot);

const parkingLotRouter = new Router;

parkingLotRouter.use('/parking-lot',parkingLotManage.routes());

module.exports = parkingLotRouter;
