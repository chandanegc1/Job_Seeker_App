import { UnauthenticatedError, UnauthorizedError } from "../CustomError/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthenticatedError('authentication invalid');
    }
    try {
      const { userId, role } = verifyJWT(token);
      req.user = { userId, role }; //doubt
      next();
    } catch (error) {
      throw new UnauthenticatedError('authentication invalid');
    }
  };

  export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError('Unauthorized to access this route');
      }
      next();
    };
  };
