"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balanceController_1 = require("../controllers/balanceController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/get', authMiddleware_1.default, (req, res) => {
    console.log('GET /api/balance/get route hit');
    (0, balanceController_1.getBalance)(req, res);
});
router.put('/update', authMiddleware_1.default, (req, res) => {
    console.log('PUT /api/balance/update route hit');
    (0, balanceController_1.updateBalance)(req, res);
});
exports.default = router;
