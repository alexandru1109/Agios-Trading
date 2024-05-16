"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const authController = __importStar(require("../auth/authController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
jest.mock('../auth/authController');
describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /api/auth/register', () => {
        it('should register a user successfully', async () => {
            authController.register.mockImplementation((req, res) => {
                res.status(201).json({ message: 'User registered' });
            });
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'password', role: 'user', strategy: 'strategy1' });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered');
        });
        it('should return 400 if user already exists', async () => {
            authController.register.mockImplementation((req, res) => {
                res.status(400).json({ message: 'User already exists' });
            });
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'password', role: 'user', strategy: 'strategy1' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });
    describe('POST /api/auth/login', () => {
        it('should login a user successfully', async () => {
            authController.login.mockImplementation((req, res) => {
                res.status(200).json({ token: 'fake-jwt-token', message: 'User logged in successfully' });
            });
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({ email: 'john@example.com', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body.token).toBe('fake-jwt-token');
            expect(response.body.message).toBe('User logged in successfully');
        });
        it('should return 400 for invalid email or password', async () => {
            authController.login.mockImplementation((req, res) => {
                res.status(400).json({ message: 'Invalid email or password' });
            });
            const response = await (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({ email: 'john@example.com', password: 'wrongpassword' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid email or password');
        });
    });
});
