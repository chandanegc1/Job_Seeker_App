import Job from "../Models/JobModel.js"
import StatusCodes from "http-status-codes";
import { NotFoundError } from "../CustomError/customError.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAlljob = async(req , res)=>{
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({jobs});
}

export const getJob = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const job = await Job.findById(id);
    if (!job) throw new NotFoundError(`no job with id : ${id}`);
    res.status(StatusCodes.OK).json({ job });
  };


export const deletejob = async(req ,res)=>{
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);

    if(!id) throw new NotFoundError(`no job with id : ${id}`);
    res.status(StatusCodes.OK).json({removedJob});
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true, // show in  response is updated values;
    });
  
    if (!updatedJob) throw new NotFoundError(`no job with id : ${id}`);
    res.status(StatusCodes.OK).json({ job: updatedJob });
};


export const showStats = async(req , res)=>{
  let stats = await Job.aggregate([
    {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
    {$group:{_id:'$jobStatus' , count:{$sum:1}}}
  ])

  stats = stats.reduce((acc , curr)=>{
    const {_id:title ,count} = curr;
    acc[title] = count;
    return acc ;
  } ,{});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined:stats.declined || 0
  }


  let monthlyApplications = await Job.aggregate([
    {$match:{createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
    {$group:{
      _id:{year:{$year:'$createdAt'} , month:{$month:'$createdAt'}},
      count:{$sum:1}
    }},
    {$sort:{'_id.year':-1 ,'_id.month':-1}},
    {$limit: 6},
  ]);

  monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;

    const date = dayjs()
      .month(month - 1)
      .year(year)
      .format('MMM YY');
    return { date, count };
  })
  .reverse();

res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
