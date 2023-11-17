"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findByNameOrIngredients = exports.editFood = exports.deleteFood = exports.createFood = exports.findOne = exports.All = void 0;
const Foods_1 = require("../models/Foods");
const sequelize_1 = require("sequelize");
const ingredients_1 = require("../models/ingredients");
const fs = require('fs');
const path = __importStar(require("path"));
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield Foods_1.Food.findAll();
        const uploadPath = path.join(__dirname, '../uploads');
        // res.json(foods)
        res.json(foods);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alimentos' });
    }
});
exports.All = All;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const food = yield Foods_1.Food.findByPk(id, {
            include: ingredients_1.Ingredients,
        });
        if (!food) {
            return res.status(404).json({ error: 'Prato não encontrado' });
        }
        res.json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    }
});
exports.findOne = findOne;
const createFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const extension = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename.split('.')[1];
        const data = JSON.parse(req.body.data);
        console.log("DADOS::", (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename, data.name, data.category, data.description, data.ingredients, data.price);
        console.log("req.body:", req.body);
        console.log("Req.body.data", req.body.data);
        console.log("file====>", req.file);
        console.log("DATA:", data);
        const uploadPath = path.join(__dirname, '../uploads');
        const newFileName = `${data.name}.${extension}`;
        yield fs.renameSync((_c = req.file) === null || _c === void 0 ? void 0 : _c.path, path.join(uploadPath, newFileName));
        if (!data.name) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando' });
        }
        else {
            const newFood = yield Foods_1.Food.create({ image: newFileName, name: data.name, category: data.category, description: data.description, price: data.price });
            console.log("newFood::", newFood);
            for (const ingredientsName of data.ingredients) {
                yield ingredients_1.Ingredients.create({ name: ingredientsName, id_food: newFood.id });
            }
            return (res.status(201).json({ message: 'Alimento salvo com sucesso!' }));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar alimento' });
    }
});
exports.createFood = createFood;
const deleteFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const food = yield Foods_1.Food.findByPk(id);
        if (food) {
            yield food.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Alimento não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao excluir alimento' });
    }
});
exports.deleteFood = deleteFood;
const editFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const id = req.params.id;
    try {
        const food = yield Foods_1.Food.findByPk(id, {
            include: ingredients_1.Ingredients,
        });
        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
        }
        const extension = (_d = req.file) === null || _d === void 0 ? void 0 : _d.filename.split('.')[1];
        const data = JSON.parse(req.body.data);
        const uploadPath = path.join(__dirname, '../uploads');
        const newFileName = `${data.name}.${extension}`;
        yield fs.renameSync((_e = req.file) === null || _e === void 0 ? void 0 : _e.path, path.join(uploadPath, newFileName));
        if (req.file) {
            food.image = newFileName;
        }
        if (data.name) {
            food.name = data.name;
        }
        if (data.category) {
            food.category = data.category;
        }
        if (data.description) {
            food.description = data.description;
        }
        if (data.price) {
            food.price = data.price;
        }
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("DADOS::", (_f = req.file) === null || _f === void 0 ? void 0 : _f.filename, data.name, data.category, data.description, data.ingredients, data.price);
        console.log("req.body:", req.body);
        console.log("Req.body.data", req.body.data);
        console.log("DATA:", data);
        console.log("terminalogo", data.ingredients);
        yield ingredients_1.Ingredients.destroy({
            where: {
                id_food: food.id,
            },
        });
        for (const ingredientName of data.body.ingredients) {
            console.log("LISTA DE INGREDIENTS:", data.body.ingredients);
            yield ingredients_1.Ingredients.create({ name: ingredientName, id_food: food.id });
            console.log("ingredients ================>", ingredientName);
        }
        yield food.save();
        res.status(200).json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar alimento' });
    }
});
exports.editFood = editFood;
const findByNameOrIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ingredients } = req.query;
    const whereCondition = yield ingredients_1.Ingredients.findAll({
        include: {
            model: Foods_1.Food,
            required: true,
            where: {
                "name": {
                    [sequelize_1.Op.like]: `%${ingredients}%`
                }
            }
        },
        where: {
            [sequelize_1.Op.or]: [
                {
                    name: {
                        [sequelize_1.Op.like]: `%${ingredients}%`
                    }
                },
            ]
        }
    });
    console.log("WHERECONDITION: ", whereCondition);
    res.json(whereCondition);
    /*
        try {
            const whereCondition: Record<string, any> = {};
    
            if (name) {
                whereCondition['name'] = { [Op.like]: `%${name}%` };
            }
    
            if (ingredients) {
                whereCondition['ingredients'] = { [Op.like]: `%${ingredients}%` };
                console.log("WERECONDITION", whereCondition)
            }
    
            if (Object.keys(whereCondition).length > 0) {
                const foundFoods = await Food.findAll({ where: whereCondition });
                res.json(foundFoods);
            } else {
                res.status(400).json({ error: 'Parâmetros inválidos' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar alimentos' });
        } */
});
exports.findByNameOrIngredients = findByNameOrIngredients;
