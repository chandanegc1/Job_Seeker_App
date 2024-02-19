import Job from "../Models/JobModel.js"
import StatusCodes from "http-status-codes";
import { NotFoundError } from "../CustomError/customError.js";


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
  