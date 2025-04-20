import { z } from "zod";

// Helper schemas
const UserNameValidationSchema = z.object({
  firstName: z.string()
    .max(20, { message: 'First name cannot be longer than 20 characters' })
    .nonempty({ message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string()
    .nonempty({ message: 'Last name is required' })
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'Father name is required' }),
  fatherOccupation: z.string().nonempty({ message: 'Father occupation is required' }),
  fatherContactNo: z.string().nonempty({ message: 'Father contact number is required' }),
  motherName: z.string().nonempty({ message: 'Mother name is required' }),
  motherOccupation: z.string().nonempty({ message: 'Mother occupation is required' }),
  motherContactNo: z.string().nonempty({ message: 'Mother contact number is required' })
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Local guardian name is required' }),
  occupation: z.string().nonempty({ message: 'Local guardian occupation is required' }),
  contactNo: z.string().nonempty({ message: 'Local guardian contact number is required' }),
  address: z.string().nonempty({ message: 'Local guardian address is required' })
});

// Main student validation schema
const StudentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'Student ID is required' }),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required',
    invalid_type_error: "Gender must be either 'male' or 'female'"
  }),
  dateOfBirth: z.string().optional(),
  email: z.string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  contactNo: z.string().nonempty({ message: 'Contact number is required' }),
  emergencyContactNo: z.string().nonempty({ message: 'Emergency contact number is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddres: z.string().nonempty({ message: 'Present address is required' }),
  permanentsAddress: z.string().nonempty({ message: 'Permanent address is required' }),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean(),
});

export default StudentValidationSchema;