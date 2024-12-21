import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user, 'req.user');
   const verifyData= await schema.parseAsync({
      body: req.body,
    });
    req.body = verifyData.body;
    next();
  });
};
export default validateRequest;
