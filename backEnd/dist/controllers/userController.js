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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.login = exports.createUser = exports.All = void 0;
const Users_1 = require("../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.User.findAll();
    res.json(users);
});
exports.All = All;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, isAdm } = req.body;
    if (req.body.name && req.body.email && req.body.password) {
        let hashUser = yield Users_1.User.findOne({ where: { email } });
        console.log('dados pegos, email encontrado:', email);
        if (!hashUser) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            let newUser = yield Users_1.User.create({ name, email, password: hashedPassword, isAdm });
            res.json({ newUser });
        }
        else {
            res.json({ error: 'E-mail já existe' });
        }
    }
    else {
        res.json({ error: 'error' });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;
        console.log("email:", email);
        console.log("password", password);
        let user = yield Users_1.User.findOne({
            where: { email }
        });
        const acept = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user && acept) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            let newUser = {
                id: user.id,
                nome: user.name,
                email: user.email,
                isAdm: user.isAdm
            };
            res.json({ status: true, token, user: newUser });
            return;
        }
        res.status(400).json({ status: false });
    }
    else {
    }
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield Users_1.User.findByPk(id);
        if (user) {
            yield user.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'User não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao excluir user' });
    }
});
exports.deleteUser = deleteUser;
