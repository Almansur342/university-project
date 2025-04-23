import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../user/sendResponse';
import  httpStatus  from "http-status";
import { cathcAsync } from '../utils/catchAsync';


const getAllStudent = cathcAsync(
  async (req, res) => {
      const result = await StudentServices.getAllStudentFromDB();
      sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Student is created',
        data:result,
      })
    })
const getSingleStudent =cathcAsync( async (req,res) => {
 
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:'Student is created',
      data:result,
    })
}
)

const deleteSingleStudent =cathcAsync( async (req, res)=>{
   const {studentId} = req.params;
   const result = await StudentServices.deleteSingleStudentFromDB(studentId);

   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:'Student is created',
    data:result,
  })
  
}
)
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
