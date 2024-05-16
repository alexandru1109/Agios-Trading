"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const stockRoutes_1 = __importDefault(require("../routes/stockRoutes"));
const stockModel_1 = __importDefault(require("../models/stockModel"));
const alphaVantageService_1 = __importDefault(require("../alphaVantageService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/stocks', stockRoutes_1.default);
jest.mock('../alphaVantageService');
describe('Stock Routes', () => {
    let server;
    const mockStock = {
        symbol: 'AAPL',
        history: [{ date: '2023-01-01', open: 150, high: 155, low: 148, close: 153, volume: 100000 }],
        indicators: { sma: 150, ema: 152 },
    };
    beforeAll(async () => {
        const url = process.env.MONGODB_URI || `mongodb://127.0.0.1/stock_test`;
        await mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        server = app.listen(5001);
    }, 30000); // Increase the timeout to 30 seconds
    afterAll(async () => {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
        server.close();
    }, 30000); // Increase the timeout to 30 seconds
    afterEach(async () => {
        await stockModel_1.default.deleteMany({});
        jest.clearAllMocks();
    });
    describe('POST /api/stocks', () => {
        it('should create new stock data', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/stocks')
                .send(mockStock);
            expect(response.status).toBe(201);
            expect(response.body.symbol).toBe(mockStock.symbol);
        }, 30000); // Increase the timeout to 30 seconds
        it('should return 500 if there is an error creating stock data', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/stocks')
                .send({});
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error creating stock data');
        }, 30000); // Increase the timeout to 30 seconds
    });
    describe('GET /api/stocks/:symbol', () => {
        it('should fetch stock data by symbol from database', async () => {
            await stockModel_1.default.create(mockStock);
            const response = await (0, supertest_1.default)(app).get(`/api/stocks/${mockStock.symbol}`);
            expect(response.status).toBe(200);
            expect(response.body.symbol).toBe(mockStock.symbol);
        }, 30000); // Increase the timeout to 30 seconds
        it('should fetch stock data by symbol from Alpha Vantage if not in database', async () => {
            alphaVantageService_1.default.getStockData.mockResolvedValue(mockStock);
            const response = await (0, supertest_1.default)(app).get(`/api/stocks/${mockStock.symbol}`);
            expect(response.status).toBe(200);
            expect(response.body.symbol).toBe(mockStock.symbol);
        }, 30000); // Increase the timeout to 30 seconds
        it('should return 500 if stock data is not found', async () => {
            alphaVantageService_1.default.getStockData.mockRejectedValue(new Error('Stock not found'));
            const response = await (0, supertest_1.default)(app).get('/api/stocks/INVALID');
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error fetching stock data');
        }, 30000); // Increase the timeout to 30 seconds
    });
    describe('PUT /api/stocks/:symbol', () => {
        it('should update stock data by symbol', async () => {
            await stockModel_1.default.create(mockStock);
            const updatedData = Object.assign(Object.assign({}, mockStock), { history: [...mockStock.history, { date: '2023-01-02', open: 160, high: 165, low: 158, close: 163, volume: 120000 }] });
            const response = await (0, supertest_1.default)(app)
                .put(`/api/stocks/${mockStock.symbol}`)
                .send(updatedData);
            expect(response.status).toBe(200);
            expect(response.body.history).toHaveLength(2);
        }, 30000); // Increase the timeout to 30 seconds
        it('should return 500 if there is an error updating stock data', async () => {
            const response = await (0, supertest_1.default)(app)
                .put('/api/stocks/INVALID')
                .send({ history: ['updated'] });
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error updating stock data');
        }, 30000); // Increase the timeout to 30 seconds
    });
});
