import { sequelize } from "../instances/mysql";
import { User } from "./Users";
import { Food } from "./Foods";
import { DataTypes } from "sequelize";


export const Order = sequelize.define('Order', {

    quant:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

/*(async () => {
    await sequelize.sync({ force: true });

})();*/


User.belongsToMany(Food, {through: 'Order', foreignKey:'user_id' })
Food.belongsToMany(User, {through: 'Order', foreignKey:'food_id' })


 
