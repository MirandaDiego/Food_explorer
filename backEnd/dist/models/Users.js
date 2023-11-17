"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Foods_1 = require("./Foods");
const Purchases_1 = require("./Purchases");
;
exports.User = mysql_1.sequelize.define('Users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isAdm: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    timestamps: false
});
exports.User.hasMany(Purchases_1.Purchases, { foreignKey: { name: 'user_id' } });
Purchases_1.Purchases.belongsTo(exports.User, { foreignKey: { name: 'user_id' } });
exports.User.belongsToMany(Foods_1.Food, { through: 'Favorites' });
Foods_1.Food.belongsToMany(exports.User, { through: 'Favorites' });
/*
(async () => {
    await sequelize.sync({ force: true });

  })();*/
