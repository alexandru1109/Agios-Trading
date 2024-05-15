"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("./authService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Controller pentru înregistrare
const register = async (req, res) => {
    try {
        const { name, email, password, role, strategy } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
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
        res.send({ user, message: 'User registered successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService_1.AuthService.login(email, password);
        res.send({ token, message: 'User logged in successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
exports.login = login;
