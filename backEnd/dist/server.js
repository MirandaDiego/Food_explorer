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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const oder_1 = __importDefault(require("./routes/oder"));
const food_1 = __importDefault(require("./routes/food"));
const mysql_1 = require("./instances/mysql");
//import {upload} from './upload'
const upload_1 = require("./upload");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const upload = (0, multer_1.default)({ storage: upload_1.storage });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, './uploads')));
app.use(express_1.default.json());
app.get('/upload', upload.single('uploads'), (req, res) => {
    var _a;
    return res.json((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
});
app.use(user_1.default, oder_1.default, food_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mysql_1.sequelize.sync({ alter: true });
}))();
app.listen(3000, () => console.log('server is running'));
