import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");
        console.log(process.env.PORT);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;