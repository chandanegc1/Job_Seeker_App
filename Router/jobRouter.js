import { Router } from "express";
import { createJob, deletejob, getAllJobs, getJob, showStats, updateJob } from "../controllers/jobcontroller.js";
import { validateJobInput } from "../Middleware/ValidationMiddleware.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";

const router = Router();

router.route("/").post(authenticateUser, validateJobInput,createJob).get(authenticateUser ,getAllJobs);
router.route("/stats").get(authenticateUser ,showStats)
router.route("/:id").get(authenticateUser ,getJob).delete(authenticateUser , deletejob).patch(authenticateUser ,validateJobInput , updateJob);

export default router;