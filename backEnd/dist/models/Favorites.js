"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorites = void 0;
const mysql_1 = require("../instances/mysql");
const Users_1 = require("./Users");
const Foods_1 = require("./Foods");
exports.Favorites = mysql_1.sequelize.define('Favorites', {});
Users_1.User.belongsToMany(Foods_1.Food, { through: 'Favorites' });
Foods_1.Food.belongsToMany(Users_1.User, { through: 'Favorites' });
