import { Router } from "express";
import { createJob, deletejob, getAlljob, getJob, updateJob } from "../controllers/jobcontroller.js";
import { validateJobInput } from "../Middleware/ValidationMiddleware.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";

const router = Router();

router.route("/").post(authenticateUser, validateJobInput,createJob).get(authenticateUser ,getAlljob);
router.route("/:id").get(authenticateUser ,getJob).delete(authenticateUser , deletejob).patch(authenticateUser ,validateJobInput , updateJob);

export default router;