"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = __importDefault(require("../controllers/stockController"));
const router = (0, express_1.Router)();
router.get('/:symbol', (req, res) => stockController_1.default.getStockData(req, res));
router.put('/:symbol', (req, res) => stockController_1.default.updateStockData(req, res));
router.post('/', (req, res) => stockController_1.default.createStockData(req, res));
exports.default = router;
