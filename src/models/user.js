export const User = (sequelize, DataTypes) =>{
    return sequelize.define('user',{
        user_id : {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        email : {
            type:DataTypes.STRING,
            unique: true,
            allownull:false
        },
        password: {
            type:DataTypes.STRING,
            allownull:false
        },
        name : {
            type:DataTypes.STRING,
            allownull:false
        }
    });
}