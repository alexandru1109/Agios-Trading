"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserProfile = async (req, res) => {
    var _a;
    try {
        const user = await userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    var _a;
    try {
        const { name, email, password, role, strategy } = req.body;
        const user = await userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.strategy = strategy || user.strategy;
        if (password) {
            user.passHash = await bcryptjs_1.default.hash(password, 10);
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error });
    }
};
exports.updateUserProfile = updateUserProfile;
