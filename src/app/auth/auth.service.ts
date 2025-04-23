import AppError from "../error/AppError";
import { userModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'

const loginUser = async(payload:TLoginUser)=>{
  const isUserExist = 
  console.log(isUserExist)
  if(!isUserExist){
    throw new AppError(httpStatus.NOT_FOUND,'This is user does not exit');
  }

  const isUserDeleted = isUserExist?.isDeleted;

  if(isUserDeleted){
    throw new AppError(httpStatus.FORBIDDEN,'This user is deleted');
  }

  //checking the password is correct or not
 const isPasswordMatched = await bcrypt.compare(payload?.password,isUserExist?.password);
  
  console.log(isPasswordMatched);

  // const isUserBlocked = isUserExist?.status;

  // if(isUserBlocked){
  //   throw new AppError(httpStatus.FORBIDDEN,'This user is Blocked');
  // }


  console.log(payload);
  return
}

export const AuthService = {
  loginUser,
}