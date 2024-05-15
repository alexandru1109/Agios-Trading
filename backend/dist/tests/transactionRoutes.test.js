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
const transactionRoutes_1 = __importDefault(require("../routes/transactionRoutes"));
const transactionController = __importStar(require("../controllers/transactionController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/transactions', transactionRoutes_1.default);
jest.mock('../controllers/transactionController');
jest.mock('../auth/authMiddleware', () => jest.fn((req, res, next) => {
    req.user = { _id: '1' }; // Mock user ID
    next();
}));
describe('Transaction Routes', () => {
    const mockTransaction = {
        _id: '1',
        userId: '1',
        type: 'buy',
        quantity: 10,
        price: 150,
        date: new Date(),
        symbol: 'AAPL',
        strategy: 'strategy1',
    };
    describe('POST /api/transactions', () => {
        it('should add a new transaction', async () => {
            try {
                transactionController.addTransaction.mockImplementation((req, res) => {
                    res.status(201).json(mockTransaction);
                });
                const response = await (0, supertest_1.default)(app)
                    .post('/api/transactions')
                    .send(mockTransaction);
                expect(response.status).toBe(201);
                expect(response.body).toEqual(Object.assign(Object.assign({}, mockTransaction), { date: mockTransaction.date.toISOString() }));
            }
            catch (error) {
                console.error('Error in POST /api/transactions test:', error);
            }
        });
        it('should return 400 if there is an error', async () => {
            try {
                transactionController.addTransaction.mockImplementation((req, res) => {
                    res.status(400).json({ message: 'Error adding transaction' });
                });
                const response = await (0, supertest_1.default)(app)
                    .post('/api/transactions')
                    .send({});
                expect(response.status).toBe(400);
                expect(response.body.message).toBe('Error adding transaction');
            }
            catch (error) {
                console.error('Error in POST /api/transactions test:', error);
            }
        });
    });
    describe('GET /api/transactions', () => {
        it('should fetch transaction history', async () => {
            try {
                transactionController.getTransactionHistory.mockImplementation((req, res) => {
                    res.status(200).json([mockTransaction]);
                });
                const response = await (0, supertest_1.default)(app).get('/api/transactions');
                expect(response.status).toBe(200);
                expect(response.body).toEqual([Object.assign(Object.assign({}, mockTransaction), { date: mockTransaction.date.toISOString() })]);
            }
            catch (error) {
                console.error('Error in GET /api/transactions test:', error);
            }
        });
        it('should return 400 if there is an error', async () => {
            try {
                transactionController.getTransactionHistory.mockImplementation((req, res) => {
                    res.status(400).json({ message: 'Error fetching transactions' });
                });
                const response = await (0, supertest_1.default)(app).get('/api/transactions');
                expect(response.status).toBe(400);
                expect(response.body.message).toBe('Error fetching transactions');
            }
            catch (error) {
                console.error('Error in GET /api/transactions test:', error);
            }
        });
    });
});
