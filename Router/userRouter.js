import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { authorizePermissions } from "../Middleware/authMiddleware.js";

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin') , getApplicationStats]);// doubt
router.patch('/update-user', updateUser);
export default router;
