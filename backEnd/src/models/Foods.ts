import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Ingredients } from "./ingredients";

export interface FoodInstance extends Model{
    id:number,
    image:string,
    name:string,
    category: string,
    description:string,
    price:number,

};

enum FoodCategory {
    Refeicoes = 'Refeições',
    Sobremesas = 'Sobremesas',
    Bebidas = 'Bebidas',
  }

export const Food = sequelize.define<FoodInstance>('Foods', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER.UNSIGNED 
        
    },
    image:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
     
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
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

Food.hasMany(Ingredients, { foreignKey: {name: 'id_food'} });
Ingredients.belongsTo(Food, { foreignKey: {name: 'id_food'} });





