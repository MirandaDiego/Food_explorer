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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foodController = __importStar(require("../controllers/foodController"));
const express_validator_1 = require("express-validator");
//import uploads from "../upload";
const upload_1 = require("../upload");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: upload_1.storage });
const foodRouter = (0, express_1.Router)();
foodRouter.get('/foods', foodController.All);
foodRouter.post('/foods', upload.single('image'), foodController.createFood);
foodRouter.get('/foods/search', [
    (0, express_validator_1.query)('name').optional().isString(),
    (0, express_validator_1.query)('ingredients').optional().isString(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    foodController.findByNameOrIngredients(req, res);
}));
//http://localhost:5000/foods/search?ingredients=fk
//http://localhost:5000/foods/search?name=fk
foodRouter.delete('/food/:id', foodController.deleteFood);
foodRouter.put("/food/:id", upload.single('image'), foodController.editFood);
foodRouter.get("/:id", foodController.findOne);
//foodRouter.get("/:name", foodController.findOne);
exports.default = foodRouter;
