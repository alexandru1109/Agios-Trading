import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection';
import morgan from 'morgan'; 
import authRoutes from './routes/authRoutes';
import stockRoutes from './routes/stockRoutes';
import transactionRoutes from './routes/transactionRoutes';
import userRoutes from './routes/userRoutes';
import authMiddleware from './auth/authMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import chatbotRoutes from './routes/chatbotRoutes';
import cors from 'cors';
import marketRoutes from './routes/marketRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import widgetRoutes from './routes/widgetRoutes';
import balanceRoutes from './routes/balanceRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/widgets', widgetRoutes);
app.use('/api/balance', balanceRoutes);


app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.use(errorMiddleware);

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
