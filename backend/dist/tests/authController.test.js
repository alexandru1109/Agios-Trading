"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const authController_1 = require("../auth/authController");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
jest.mock('../models/userModel');
jest.mock('bcryptjs');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/auth/register', authController_1.register);
describe('Auth Controller - Register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should register a user successfully', async () => {
        const mockUser = {
            name: 'John Doe',
            email: 'john@example.com',
            passHash: 'hashedpassword',
            role: 'user',
            strategy: 'strategy1'
        };
        userModel_1.default.findOne.mockResolvedValue(null);
        bcryptjs_1.default.hash.mockResolvedValue('hashedpassword');
        userModel_1.default.prototype.save.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/register')
            .send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'user',
            strategy: 'strategy1'
        });
        expect(response.status).toBe(200);
        expect(response.body.user).toEqual(mockUser);
        expect(response.body.message).toBe('User registered successfully');
    });
    it('should return 400 if user already exists', async () => {
        userModel_1.default.findOne.mockResolvedValue({ email: 'john@example.com' });
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/register')
            .send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'user',
            strategy: 'strategy1'
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe('User already exists');
    });
    it('should return 500 if there is an error', async () => {
        userModel_1.default.findOne.mockRejectedValue(new Error('Database error'));
        const response = await (0, supertest_1.default)(app)
            .post('/api/auth/register')
            .send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'user',
            strategy: 'strategy1'
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe('Database error');
    });
});
