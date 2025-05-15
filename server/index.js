import express from "express";
import { configDotenv } from "dotenv";
import http from 'http';
import cookieParser from "cookie-parser";
import cors from "cors";
import app from "./app.js";
import {connectToMongoDB} from "./config/db.js";
const server = http.createServer(app); 

configDotenv();
connectToMongoDB();
const port = process.env.PORT; 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});