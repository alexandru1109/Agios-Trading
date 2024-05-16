"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/add', authMiddleware_1.default, transactionController_1.addTransaction);
router.get('/get', authMiddleware_1.default, transactionController_1.getTransactionHistory);
exports.default = router;
