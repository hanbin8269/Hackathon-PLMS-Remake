export const ParkingLot = (sequelize,DataTypes) =>{
    return sequelize.define('parkingLot',{
        parkingLot_id : {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        owner_id : {
            type : DataTypes.INTEGER,
            allownull : false
        },
        name : {
            type : DataTypes.STRING,
            default : '익명의 주차장',
            allownull : true
        },
        max_seat : {
            type : DataTypes.INTEGER,
            allownull : false
        },
        current_seat : {
            type : DataTypes.INTEGER,
            allownull : false
        },
        pos_x : {
            type : DataTypes.FLOAT,
            allownull : false
        },
        pos_y : {
            type : DataTypes.FLOAT,
            allownull : false
        }
    });
}