/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser  {
  id: string;
  password: string;
  needPasswordChange?: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status:'in-progress'|'blocked';
};

export interface UserModel extends Model<TUser>{
isUserExistByCustomId (id:string):Promise<TUser>
}
