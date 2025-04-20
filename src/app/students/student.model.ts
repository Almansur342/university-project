import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  Guardian,
  LocalGuardian,
  StudentInterface,
  StudentModel,
  UserName,
} from './student.interface';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<StudentInterface, StudentModel>({
  id: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  presentAddres: {
    type: String,
    required: true,
  },
  permanentsAddress: {
    type: String,
    required: true,
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
  },
  isDeleted:{
    type:Boolean,
    default: false,
  }
});

// pre save middleware/hook
studentSchema.pre('save', async function(next){
  //hashing password
  const student = this; //document, all the data
 student.password = await bcrypt.hash(student.password,Number(config.bcrypt_salt_round));
 next();
})

// post save middleware
studentSchema.post('save', function(doc,next){
  doc.password='';
  next();
})

studentSchema.pre('find', async function (next) {
  this.find({isDeleted:{$ne:true}});
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.findOne({isDeleted:{$ne:true}});
  next();
})



//creating a custom static
studentSchema.statics.isStudentExists = async function (id:string) {
  const existingStudent = await Student.findOne({id});
  return existingStudent;
};

export const Student = model<StudentInterface,StudentModel>('Student', studentSchema);
