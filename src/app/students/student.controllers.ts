import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const validateData = StudentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(validateData);
    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      message:err.message || 'Something went wrong',
      error:err,
    })
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'students are got successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      message:err.message || 'Something went wrong',
      error:err,
    })
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students is got successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      message:err.message || 'Something went wrong',
      error:err,
    })
  }
};

const deleteSingleStudent = async (req:Request, res:Response)=>{
  try{
   const {studentId} = req.params;
   const result = await StudentServices.deleteSingleStudentFromDB(studentId);
   res.status(200).json({
    success: true,
    message: 'students is deleted successfully',
    data: result,
  });
  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message || 'Something went wrong',
      error:err,
    })
  }
}
export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
