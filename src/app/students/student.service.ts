import { StudentInterface } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: StudentInterface) => {
  if(await Student.isStudentExists(studentData.id)){
    throw new Error('Student already exist');
  }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteSingleStudentFromDB = async (id:string) =>{
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB
};
