import { DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { User } from "./Users";


export const Purchases = sequelize.define("Purchases", {

  id:{
    type:DataTypes.INTEGER.UNSIGNED,
    autoIncrement:true,
    primaryKey:true
  },

  status:{
    type:DataTypes.STRING,
    defaultValue: 'pending',
    
  },
  details:{
    type:DataTypes.STRING,
    allowNull:true
  },

});



