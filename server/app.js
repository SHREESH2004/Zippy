import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
import adminProductRouter from './routes/admin/product.routes.js'
import cartRoutes from './routes/cart.routes.js';
import addressRoutes from './routes/address.routes.js';
configDotenv();
const app=express();
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"], 
    credentials: true, 
}));
  app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use('/user',userRoutes);
app.use('/admin/products',adminProductRouter);
app.use('/cart', cartRoutes);
app.use('/address', addressRoutes);
export default app;