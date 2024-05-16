"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactionRoutes_1 = __importDefault(require("../routes/transactionRoutes"));
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/transactions', transactionRoutes_1.default);
// Properly mock the authentication middleware
jest.mock('../auth/authMiddleware', () => jest.fn((req, res, next) => {
    if (req.headers.authorization) {
        req.user = { id: '605c72ef2f7992313c444444' }; // Mock user ID
        next();
    }
    else {
        res.status(401).json({ message: 'User not authenticated' });
    }
}));
describe('Transaction Routes', () => {
    beforeAll(async () => {
        const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1/transactions_test';
        await mongoose_1.default.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
    });
    afterEach(async () => {
        await transactionModel_1.default.deleteMany({});
    });
    const mockTransaction = {
        userId: new mongoose_1.default.Types.ObjectId('605c72ef2f7992313c444444'),
        type: 'buy',
        quantity: 10,
        price: 150,
        date: new Date(),
        symbol: 'AAPL',
        strategy: 'strategy1',
    };
    describe('POST /api/transactions', () => {
        it('should add a new transaction', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/transactions')
                .set('Authorization', 'Bearer mockToken')
                .send(mockTransaction);
            console.log('POST Response:', response.body);
            expect(response.status).toBe(201);
            expect(response.body.transaction).toMatchObject(Object.assign(Object.assign({}, mockTransaction), { date: mockTransaction.date.toISOString(), userId: '605c72ef2f7992313c444444' }));
            expect(response.body.message).toBe('Transaction added successfully');
        });
        it('should return 401 if user is not authenticated', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/transactions')
                .send(mockTransaction);
            console.log('POST Response (not authenticated):', response.body);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('User not authenticated');
        });
    });
    describe('GET /api/transactions', () => {
        it('should fetch transaction history', async () => {
            const transaction = new transactionModel_1.default(mockTransaction);
            await transaction.save();
            const response = await (0, supertest_1.default)(app)
                .get('/api/transactions')
                .set('Authorization', 'Bearer mockToken');
            console.log('GET Response:', response.body);
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toMatchObject(Object.assign(Object.assign({}, mockTransaction), { date: mockTransaction.date.toISOString(), userId: '605c72ef2f7992313c444444' }));
        });
        it('should return 401 if user is not authenticated', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/transactions');
            console.log('GET Response (not authenticated):', response.body);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('User not authenticated');
        });
    });
});
