import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../config";

const userSchema = new Schema<TUser,UserModel>(
  {
  id:{
    type:String,
    required: true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  needPasswordChange:{
    type:Boolean,
     default:true,
  },
  role:{
    type:String,
    enum: ['admin','student','faculty'],
  },
  isDeleted:{
    type:Boolean,
    default:false,
  },
  status:{
    type:String,
    enum:['in-progress','blocked']
  },
},
{
  timestamps:true,
}
);

userSchema.pre('save', async function(next){
  //hashing password
  const user = this; //document, all the data
 user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_round));
 next();
})

// post save middleware
userSchema.post('save', function(doc,next){
  doc.password='';
  next();
});


userSchema.statics.isUserExistByCustomId = async function(id:string){
 return await userModel.findOne({id:payload?.id});
}


export const userModel = model<TUser,UserModel>('User',userSchema);