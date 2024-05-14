"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class AuthService {
    // Funcția pentru înregistrarea unui nou utilizator
    static register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield user.save();
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Funcția pentru autentificarea unui utilizator
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ email: email });
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
        });
    }
}
exports.AuthService = AuthService;
