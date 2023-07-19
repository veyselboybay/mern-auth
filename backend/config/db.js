import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

export default connectDB