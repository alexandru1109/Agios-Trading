"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../auth/authService"));
const register = async (req, res) => {
    try {
        const { name, email, password, role, strategy } = req.body;
        console.log('Request body:', req.body);
        const user = await authService_1.default.register(name, email, password, role, strategy);
        res.send({ user, message: 'User registered successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User already exists') {
                res.status(400).send(error.message);
            }
            else {
                res.status(500).send(error.message);
            }
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
        const token = await authService_1.default.login(email, password);
        res.send({ token, message: 'User logged in successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
exports.login = login;
