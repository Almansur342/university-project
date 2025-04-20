import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "./sendResponse";
import  httpStatus  from "http-status";

const createStudent = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    // const validateData = StudentValidationSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(password,studentData);
   
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

export const userControllers = {
  createStudent,
}