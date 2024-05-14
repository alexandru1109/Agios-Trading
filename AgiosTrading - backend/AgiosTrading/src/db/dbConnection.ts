import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/defaultDatabase');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) { 
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }  
};

export default connectDB;
