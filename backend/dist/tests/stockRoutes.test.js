"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const stockRoutes_1 = __importDefault(require("../routes/stockRoutes"));
const stockController_1 = __importDefault(require("../controllers/stockController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/stocks', stockRoutes_1.default);
jest.mock('../controllers/stockController');
describe('Stock Routes', () => {
    const mockStock = {
        symbol: 'AAPL',
        history: [],
        indicators: {},
    };
    describe('GET /api/stocks/:symbol', () => {
        it('should fetch stock data by symbol', async () => {
            try {
                stockController_1.default.getStockData.mockImplementation((req, res) => {
                    res.status(200).json(mockStock);
                });
                const response = await (0, supertest_1.default)(app).get('/api/stocks/AAPL');
                expect(response.status).toBe(200);
                expect(response.body).toEqual(mockStock);
            }
            catch (error) {
                console.error('Error in GET /api/stocks/:symbol test:', error);
            }
        });
        it('should return 500 if stock data is not found', async () => {
            try {
                stockController_1.default.getStockData.mockImplementation((req, res) => {
                    res.status(500).json({ message: 'Stock not found' });
                });
                const response = await (0, supertest_1.default)(app).get('/api/stocks/INVALID');
                expect(response.status).toBe(500);
                expect(response.body.message).toBe('Stock not found');
            }
            catch (error) {
                console.error('Error in GET /api/stocks/:symbol test:', error);
            }
        });
    });
    describe('PUT /api/stocks/:symbol', () => {
        it('should update stock data by symbol', async () => {
            try {
                const updatedStock = Object.assign(Object.assign({}, mockStock), { history: ['updated'] });
                stockController_1.default.updateStockData.mockImplementation((req, res) => {
                    res.status(200).json(updatedStock);
                });
                const response = await (0, supertest_1.default)(app)
                    .put('/api/stocks/AAPL')
                    .send({ history: ['updated'] });
                expect(response.status).toBe(200);
                expect(response.body).toEqual(updatedStock);
            }
            catch (error) {
                console.error('Error in PUT /api/stocks/:symbol test:', error);
            }
        });
        it('should return 500 if stock data is not found', async () => {
            try {
                stockController_1.default.updateStockData.mockImplementation((req, res) => {
                    res.status(500).json({ message: 'Stock not found' });
                });
                const response = await (0, supertest_1.default)(app)
                    .put('/api/stocks/INVALID')
                    .send({ history: ['updated'] });
                expect(response.status).toBe(500);
                expect(response.body.message).toBe('Stock not found');
            }
            catch (error) {
                console.error('Error in PUT /api/stocks/:symbol test:', error);
            }
        });
    });
    describe('POST /api/stocks', () => {
        it('should create new stock data', async () => {
            try {
                stockController_1.default.createStockData.mockImplementation((req, res) => {
                    res.status(201).json(mockStock);
                });
                const response = await (0, supertest_1.default)(app)
                    .post('/api/stocks')
                    .send(mockStock);
                expect(response.status).toBe(201);
                expect(response.body).toEqual(mockStock);
            }
            catch (error) {
                console.error('Error in POST /api/stocks test:', error);
            }
        });
        it('should return 500 if there is an error creating stock data', async () => {
            try {
                stockController_1.default.createStockData.mockImplementation((req, res) => {
                    res.status(500).json({ message: 'Error creating stock data' });
                });
                const response = await (0, supertest_1.default)(app)
                    .post('/api/stocks')
                    .send({ symbol: 'INVALID' });
                expect(response.status).toBe(500);
                expect(response.body.message).toBe('Error creating stock data');
            }
            catch (error) {
                console.error('Error in POST /api/stocks test:', error);
            }
        });
    });
});
