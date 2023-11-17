"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mysql_1 = require("../instances/mysql");
const Users_1 = require("./Users");
const Foods_1 = require("./Foods");
const sequelize_1 = require("sequelize");
exports.Order = mysql_1.sequelize.define('Order', {
    quant: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
/*(async () => {
    await sequelize.sync({ force: true });

})();*/
Users_1.User.belongsToMany(Foods_1.Food, { through: 'Order', foreignKey: 'user_id' });
Foods_1.Food.belongsToMany(Users_1.User, { through: 'Order', foreignKey: 'food_id' });
