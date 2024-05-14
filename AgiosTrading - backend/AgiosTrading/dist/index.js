"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
dotenv_1.default.config();
(0, dbConnection_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/stock', stockRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
