import config from '../config';
import { StudentInterface } from '../students/student.interface';
import { Student } from '../students/student.model';
import {TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (
  password: string,
  studentData: StudentInterface,
) => {

  // set user role
  const userData : Partial<TUser> = {};
  userData.role = 'student';
  
  //set password
  userData.password = password || config.default_pass as string;
  

  // manually generated id
  userData.id = '203010004'

  //create a user
  const newUser = await userModel.create(userData);
 
  //create a student
  if(Object.keys(newUser).length){
    studentData.id=newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData)
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
