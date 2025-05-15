import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
import adminProductRouter from './routes/admin/product.routes.js'
configDotenv();
const app=express();
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
}));
  app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use('/user',userRoutes);
app.use('/admin/products',adminProductRouter);
export default app;