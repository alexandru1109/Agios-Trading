"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/profile', authMiddleware_1.default, userController_1.getUserProfile);
router.put('/profile', authMiddleware_1.default, userController_1.updateUserProfile);
exports.default = router;
