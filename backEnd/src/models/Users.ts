import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Food } from "./Foods";
import { Purchases } from "./Purchases";

export interface UserInstance extends Model{
    id:number;
    name:string;
    email:string;
    password:string;
    isAdm:boolean;
    
};

export const User = sequelize.define<UserInstance>('Users', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    isAdm:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
  
},{
    timestamps:false
});



User.hasMany(Purchases, { foreignKey: {name: 'user_id'} });
Purchases.belongsTo(User, { foreignKey: {name: 'user_id'} });

User.belongsToMany(Food, {through: 'Favorites' });
Food.belongsToMany(User, {through: 'Favorites' });


/*
(async () => {
    await sequelize.sync({ force: true });

  })();*/
