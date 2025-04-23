import { UserServices } from "./user.services";
import sendResponse from "./sendResponse";
import  httpStatus  from "http-status";
import { cathcAsync } from "../utils/catchAsync";

const createStudent = cathcAsync( async (req, res) => {
    const { password, student: studentData } = req.body;
    // const validateData = StudentValidationSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(password,studentData);
   
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:'Student is created',
      data:result,
    })
  }
)

export const userControllers = {
  createStudent,
}