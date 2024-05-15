"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("./authService");
// Controller pentru înregistrare
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService_1.AuthService.register(username, email, password);
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
// Controller pentru autentificare
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
