import {  Response } from "express";
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError=(err:any,res:Response)=>{
   
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: err.message,
    statusCode: 400,
    error: err,
    stack: err.stack,
});
}