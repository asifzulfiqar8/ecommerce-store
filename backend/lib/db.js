import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log('Error connecting to MongoDB', error?.message);
        process.exit(1)
    }
}