"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const authMiddleware_1 = require("../auth/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, transactionController_1.addTransaction);
router.get('/', authMiddleware_1.authMiddleware, transactionController_1.getTransactionHistory);
exports.default = router;
