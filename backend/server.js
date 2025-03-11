import express from "express";
import env from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoute from "./routes/messageRoute.js";

const app = express();
env.config();
app.use(cors({ origin: "*" })); connectDB();
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("API is running");
})

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Port started");
})