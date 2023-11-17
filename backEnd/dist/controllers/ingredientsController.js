"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIngredients = exports.All = void 0;
const ingredients_1 = require("../models/ingredients");
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield ingredients_1.Ingredients.findAll();
    res.json(ingredients);
});
exports.All = All;
const createIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id_food } = req.body;
    if (!name || !id_food) {
        return res.status(400).json({ error: 'error' });
    }
    try {
        const newFood = yield ingredients_1.Ingredients.create({ name, id_food });
        res.status(201).json(newFood);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar alimento' });
    }
});
exports.createIngredients = createIngredients;
