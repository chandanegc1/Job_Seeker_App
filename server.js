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
app.use("/api/v1/jobs" , router); 
app.use("/api/v1/auth" ,authRouter);
app.use("/api/v1/user" , userRouter)


app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

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