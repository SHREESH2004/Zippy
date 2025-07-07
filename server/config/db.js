import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI ;
async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
        });
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export { connectToMongoDB };
