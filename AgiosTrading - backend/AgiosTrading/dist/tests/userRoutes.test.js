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
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const userController = __importStar(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
jest.mock('../controllers/userController');
jest.mock('../auth/authMiddleware', () => jest.fn((req, res, next) => {
    req.user = { _id: '1' }; // Mock user ID
    next();
}));
describe('User Routes', () => {
    const mockUser = {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        passHash: 'hashedpassword',
        role: 'user',
        strategy: 'strategy1',
    };
    describe('PUT /api/users/profile', () => {
        it('should update user profile', async () => {
            userController.updateUserProfile.mockImplementation((req, res) => {
                res.status(200).json(mockUser);
            });
            const response = await (0, supertest_1.default)(app)
                .put('/api/users/profile')
                .send({ name: 'Jane Doe' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });
        it('should return 401 if user is not authenticated', async () => {
            // Mock authMiddleware to simulate an unauthenticated user
            authMiddleware_1.default.mockImplementationOnce((req, res, next) => {
                res.status(401).json({ message: 'User not authenticated' });
            });
            const response = await (0, supertest_1.default)(app)
                .put('/api/users/profile')
                .send({ name: 'Jane Doe' });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('User not authenticated');
        });
        it('should return 404 if user is not found', async () => {
            userController.updateUserProfile.mockImplementation((req, res) => {
                res.status(404).json({ message: 'User not found' });
            });
            const response = await (0, supertest_1.default)(app)
                .put('/api/users/profile')
                .send({ name: 'Jane Doe' });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
        it('should return 500 if there is an error updating profile', async () => {
            userController.updateUserProfile.mockImplementation((req, res) => {
                res.status(500).json({ message: 'Error updating user profile' });
            });
            const response = await (0, supertest_1.default)(app)
                .put('/api/users/profile')
                .send({ name: 'Jane Doe' });
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error updating user profile');
        });
    });
});
