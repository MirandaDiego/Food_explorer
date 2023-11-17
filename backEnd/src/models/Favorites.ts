import { sequelize } from "../instances/mysql";
import { User } from "./Users";
import { Food } from "./Foods";

export const Favorites = sequelize.define('Favorites', {

});

User.belongsToMany(Food, {through: 'Favorites' });
Food.belongsToMany(User, {through: 'Favorites' });


