import mongoose from "mongoose";
const uri = 'mongodb+srv://shreeshsanyal:QBqeJ7Ukd99Qg9IX@zippy.hlp2cgw.mongodb.net/';

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
