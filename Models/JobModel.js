import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
        type:String,
        enum:['interview' , 'decline' ,'pending'],
        default:'pending'
    },
    jobType:{
        type:String,
        enum:['full-time' ,'part-time' ,'internship'],
        default:'full-time'
    },
    jobLocation:{
        type:String,
        default:'my-city'
    }
},
{timestamps:true}
);

const Job = mongoose.model('Job' , jobSchema);
export default Job;
