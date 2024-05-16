"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolioController_1 = require("../controllers/portfolioController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/portfolio-graph', authMiddleware_1.default, portfolioController_1.getPortfolioGraphData);
exports.default = router;
