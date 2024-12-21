import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
const register = async (payload: IUser): Promise<UserPayload> => {
  const result = await User.create(payload);

  return result;
};
const login = async (payload: { email: string; password: string }) => {
    // checking if the user is exist in database
    const user = await User.findOne({ email: payload?.email }).select('+password');
  
    if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }
   // //checking if the password is correct
   console.log(payload, user?.password,"payload")
   const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN,'Wrong Password !!')
  }
    // // checking if the user is inactive
    const userStatus = user?.isBlocked
  
    if (userStatus) {
      throw new AppError(StatusCodes.FORBIDDEN,'This user is blocked ! !')
    }
  
   
  
    //create token and sent to the  client side
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    }
  
    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as string });
  
    return {token, user};
  }
  

export const authService = {
  register,
  login
};
