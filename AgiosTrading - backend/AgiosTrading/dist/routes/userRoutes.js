"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../auth/authMiddleware");
const router = (0, express_1.Router)();
// Define the route to update user profile
router.put('/profile', authMiddleware_1.authMiddleware, userController_1.updateUserProfile);
exports.default = router;
