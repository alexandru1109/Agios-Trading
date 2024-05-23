"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const router = (0, express_1.Router)();
router.post('/register', authController_1.register);
router.get('/verify/:token', authController_1.verify);
router.post('/login', authController_1.login);
exports.default = router;
