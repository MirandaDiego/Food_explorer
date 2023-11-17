"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredients = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
;
exports.Ingredients = mysql_1.sequelize.define('Ingredients', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
