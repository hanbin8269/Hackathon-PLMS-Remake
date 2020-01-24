const Sequelize = require('sequelize');
const path = require('path');
// import Sequelize from 'sequelize';
// import path from 'path';

const { User } = require('./User');
const { ParkingLot } = require('./ParkingLot');
//import { User } from './User';

const config = require(path.join(__dirname,'..','config','config.json'))['development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const user = User(sequelize, Sequelize);
const parkingLot = ParkingLot(sequelize,Sequelize);
export { sequelize, Sequelize, user, parkingLot };