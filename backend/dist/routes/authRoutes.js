"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const router = (0, express_1.Router)();
router.post('/register', (req, res, next) => {
    console.log('Register route hit');
    next();
}, authController_1.register);
router.get('/verify/:token', (req, res, next) => {
    console.log(`Verify route hit with token: ${req.params.token}`);
    next();
}, authController_1.verify);
router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    next();
}, authController_1.login);
exports.default = router;
