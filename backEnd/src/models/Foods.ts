import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Order } from "./Oders";
import { User } from "./Users";

export interface FoodInstance extends Model{
    id:number;
    image:string,
    name:string,
    category:string,
    description:string,
    ingredients:string,
    price:number

};

export const Food = sequelize.define<FoodInstance>('Foods', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER.UNSIGNED 
        
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ingredients:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }


},{
    timestamps:false
});
/*
(async () => {
    await sequelize.sync({ force: true });

  })();*/




