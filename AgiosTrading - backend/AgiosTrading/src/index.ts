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

dotenv.config();

connectDB();

const app = express();

app.use(morgan('dev')); 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
