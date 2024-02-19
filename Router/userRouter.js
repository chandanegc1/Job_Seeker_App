import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { authenticateUser, authorizePermissions } from "../Middleware/authMiddleware.js";

const router = Router();

router.get('/current-user',authenticateUser, getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin') , getApplicationStats]);// doubt
router.patch('/update-user',authenticateUser, updateUser);
export default router;
