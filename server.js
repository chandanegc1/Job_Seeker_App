import 'express-async-errors';
import express from 'express';
const app = express();
import mongoose from "mongoose";
import router from './Router/routes.js';
import errorHandlerMiddleware from './Middleware/ErrorHandler.js';
import authRouter from './Router/authRouter.js';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './Middleware/authMiddleware.js';
import userRouter from "./Router/userRouter.js"

//midleware
app.use(cookieParser());
app.use(express.json());


// Router 
app.use(router); 
app.use(authRouter);
app.use(authenticateUser, userRouter)


app.use(errorHandlerMiddleware);

try {
    mongoose.connect("mongodb://127.0.0.1:27017/JonSeeker");
    app.listen(5100, () => {
      console.log('server running.... 5100');
    });
} catch (error) {
  console.log(error);
  process.exit(1);
}