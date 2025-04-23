import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../interface/handleZodError';
import handleValidationError from '../interface/handleValidationError';
import handleCastError from '../interface/handleCastError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Somethinh went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Somethinh went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifieErorr = handleZodError(err);
    statusCode = simplifieErorr.statusCode;
    message = simplifieErorr.message;
    errorSources = simplifieErorr.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifieErorr = handleValidationError(err);
    statusCode = simplifieErorr.statusCode;
    message = simplifieErorr.message;
    errorSources = simplifieErorr.errorSources;
  }else if(err?.name === 'CastError'){
    const simplifieErorr = handleCastError(err);
    statusCode = simplifieErorr.statusCode;
    message = simplifieErorr.message;
    errorSources = simplifieErorr.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env == 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/*
success
message
errorSources:[
path:'',
message:''
]
stack:
*/
