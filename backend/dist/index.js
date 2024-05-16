"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authMiddleware_1 = __importDefault(require("./auth/authMiddleware"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const chatbotRoutes_1 = __importDefault(require("./routes/chatbotRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, dbConnection_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/stocks', stockRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/chatbot', chatbotRoutes_1.default);
app.get('/api/protected', authMiddleware_1.default, (req, res) => {
    res.send('This is a protected route');
});
app.use(errorMiddleware_1.default);
const PORT = process.env.PORT || 5000;
const LLAMA_API_URL = process.env.LLAMA_API_URL;
if (!LLAMA_API_URL) {
    console.error('LLAMA_API_URL is not set');
    process.exit(1);
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connecting to Ollama API at ${LLAMA_API_URL}`);
});
