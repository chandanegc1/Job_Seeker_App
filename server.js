import 'express-async-errors';
import express from 'express';
const app = express();
import mongoose from "mongoose";
import { createJob, deletejob, getAlljob, getJob, updateJob } from './controllers/jobcontroller.js'


app.use(express.json())

try {
    mongoose.connect("mongodb://127.0.0.1:27017/JonSeeker");
    app.listen(5100, () => {
      console.log('server running.... 5100');
    });
} catch (error) {
  console.log(error);
  process.exit(1);
}


app.post("/" , createJob);
app.get("/" , getAlljob); 
app.get("/job:id" , getJob);
app.delete("/job:id" , deletejob);
app.patch("/job:id" , updateJob);



