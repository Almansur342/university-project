import mongoose from 'mongoose';
import { TErrorSources } from './error';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [{
    path:err.path,
    message:err.message,
  }]
  
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleCastError;
