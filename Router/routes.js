import { Router } from "express";
import { createJob, deletejob, getAlljob, getJob, updateJob } from "../controllers/jobcontroller.js";
import { validateJobInput } from "../Middleware/ValidationMiddleware.js";

const router = Router();

router.route("/").post( validateJobInput,createJob).get(getAlljob);
router.route("/job:id").get(getJob).delete( deletejob).patch(validateJobInput , updateJob);

export default router;