import { UnauthenticatedError } from "../CustomError/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthenticatedError('authentication invalid');
    }
  
    try {
      const { userId, role } = verifyJWT(token);
      req.user = { userId, role };
      next();
    } catch (error) {
      throw new UnauthenticatedError('authentication invalid');
    }
  };

