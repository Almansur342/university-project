import { NextFunction, Request, RequestHandler, Response } from "express"

export const cathcAsync = (fn:RequestHandler):RequestHandler=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((err)=>next(err))
  }
}