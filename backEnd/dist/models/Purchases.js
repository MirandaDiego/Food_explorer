"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchases = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Purchases = mysql_1.sequelize.define("Purchases", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'pending',
    },
    details: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
});
