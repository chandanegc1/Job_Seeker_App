import Job from "../Models/JobModel.js"
import StatusCodes from "http-status-codes";


export const createJob = async (req, res) => {
    const { company, position } = req.body;
    
    const jobs = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ jobs });
};


export const getAlljob = async(req , res)=>{
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({jobs});
}


export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ job });
  };

export const deletejob = async(req ,res)=>{
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);

    if(!id){
        res.status(StatusCodes.NOT_FOUND).json({msg:`NO job for ${id}`});
    }
    res.status(StatusCodes.OK).json({removedJob});
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true, // show in  response is updated values;
    });
  
    if (!updatedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ job: updatedJob });
  };