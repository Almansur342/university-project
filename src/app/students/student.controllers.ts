import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../user/sendResponse';
import  httpStatus  from "http-status";


const getAllStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:'Student is created',
      data:result,
    })
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:'Student is created',
      data:result,
    })
  } catch (err) {
   next(err)
  }
};

const deleteSingleStudent = async (req:Request, res:Response,next:NextFunction)=>{
  try{
   const {studentId} = req.params;
   const result = await StudentServices.deleteSingleStudentFromDB(studentId);

   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:'Student is created',
    data:result,
  })
  
  }catch(err){
    next(err);
  }
}
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
