"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const ingredients_1 = require("./ingredients");
;
var FoodCategory;
(function (FoodCategory) {
    FoodCategory["Refeicoes"] = "Refei\u00E7\u00F5es";
    FoodCategory["Sobremesas"] = "Sobremesas";
    FoodCategory["Bebidas"] = "Bebidas";
})(FoodCategory || (FoodCategory = {}));
exports.Food = mysql_1.sequelize.define('Foods', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false
});
exports.Food.hasMany(ingredients_1.Ingredients, { foreignKey: { name: 'id_food' } });
ingredients_1.Ingredients.belongsTo(exports.Food, { foreignKey: { name: 'id_food' } });
