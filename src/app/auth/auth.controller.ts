import sendResponse from "../user/sendResponse";
import { cathcAsync } from "../utils/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus from 'http-status'

const loginUser = cathcAsync(async(req,res)=>{

  const result = await AuthService.loginUser(req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    data:result,
  })
});

export const AuthController = {
  loginUser,
}