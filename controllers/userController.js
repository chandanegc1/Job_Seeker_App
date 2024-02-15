import { StatusCodes } from "http-status-codes";
import User from "../Models/UserModel.js"

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user });
  };

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};