"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const widgetController_1 = require("../controllers/widgetController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/custom-widgets', authMiddleware_1.default, widgetController_1.getCustomWidgets);
exports.default = router;
