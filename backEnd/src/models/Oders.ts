
import { sequelize } from "../instances/mysql";
import { User } from "./Users";
import { Food } from "./Foods";


export const Order = sequelize.define('Order', {});

/*(async () => {
    await sequelize.sync({ force: true });

})();*/


User.belongsToMany(Food, {through: 'Order' })
Food.belongsToMany(User, {through: 'Order' })

