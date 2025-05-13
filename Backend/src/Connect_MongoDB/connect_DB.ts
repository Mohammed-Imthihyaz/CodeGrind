import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const DB_URI: string = process.env.DB_URI || '';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(2);
  }
}; 

export default connectDB;
