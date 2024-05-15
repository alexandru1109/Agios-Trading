"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class AuthService {
    static async register(username, email, password) {
        try {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            const user = new userModel_1.default({
                name: username,
                email: email,
                passHash: hashedPassword,
                role: 'defaultRole',
                strategy: 'local'
            });
            await user.save();
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    static async login(email, password) {
        try {
            const user = await userModel_1.default.findOne({ email: email });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = bcryptjs_1.default.compareSync(password, user.passHash);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const payload = {
                userId: user._id,
                email: user.email
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' });
            return token;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthService = AuthService;
