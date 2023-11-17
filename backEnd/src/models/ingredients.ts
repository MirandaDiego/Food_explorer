import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";


export interface IngredientsInstance extends Model{
    id:number,
    name: string,
    id_food: number,
    
};

export const Ingredients = sequelize.define<IngredientsInstance>('Ingredients', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER.UNSIGNED
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    


});


