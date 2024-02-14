import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/PasswordUtils.js';
import User from '../Models/UserModel.js'


export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};


  export const login = async (req, res) => {
    res.send('register');
  };