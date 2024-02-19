import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/PasswordUtils.js';
import User from '../Models/UserModel.js'
import { UnauthenticatedError } from '../CustomError/customError.js';
import { createJWT } from '../utils/tokenUtils.js';


export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};


export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid credentials');

  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure:   1,            //'production' === 'production',  //missing and not understand
  });

  res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};