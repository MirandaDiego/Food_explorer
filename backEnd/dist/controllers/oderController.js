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
exports.createOrders = exports.All = void 0;
const Oders_1 = require("../models/Oders");
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Oders_1.Order.findAll();
    res.json(order);
});
exports.All = All;
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FoodId, UserId } = req.body;
    if (req.body.FoodId && req.body.UserId) {
    }
});
exports.createOrders = createOrders;
