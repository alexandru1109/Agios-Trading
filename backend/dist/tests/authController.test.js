"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const authController_1 = require("../auth/authController");
const authService_1 = __importDefault(require("../services/authService"));
jest.mock('../services/authService');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/auth/register', authController_1.register);
app.post('/api/auth/login', authController_1.login);
describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /api/auth/register', () => {
        it('should register a user successfully', async () => {
            const mockUser = {
                name: 'John Doe',
                email: 'john@example.com',
                passHash: 'hashedpassword',
                role: 'user',
                strategy: 'strategy1'
            };
            authService_1.default.register.mockResolvedValue(mockUser);
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
            authService_1.default.register.mockRejectedValue(new Error('User already exists'));
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
            authService_1.default.register.mockRejectedValue(new Error('Database error'));
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
    describe('POST /api/auth/login', () => {
        it('should login a user successfully', async () => {
            const mockToken = 'fake-jwt-token';
            authService_1.default.login.mockResolvedValue(mockToken);
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({
                email: 'john@example.com',
                password: 'password'
            });
            expect(response.status).toBe(200);
            expect(response.body.token).toBe(mockToken);
            expect(response.body.message).toBe('User logged in successfully');
        });
        it('should return 400 if login fails', async () => {
            authService_1.default.login.mockRejectedValue(new Error('Invalid email or password'));
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({
                email: 'john@example.com',
                password: 'wrongpassword'
            });
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid email or password');
        });
    });
});
