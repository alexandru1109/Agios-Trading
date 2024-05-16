"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async register(name, email, password, role, strategy) {
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passHash = await bcryptjs_1.default.hash(password, 10);
        const user = new userModel_1.default({
            name,
            email,
            passHash,
            role,
            strategy
        });
        await user.save();
        return user;
    }
    async login(email, password) {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passHash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return token;
    }
}
exports.default = new AuthService();
