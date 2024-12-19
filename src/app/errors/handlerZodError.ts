/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

export const handlerZodError=(err:any,res:Response)=>{
    const issues = err.issues.map((item: any) => {
        return {
            path: item.path.join('>'),
            message: item.message
        }
    });

    res.status(400).json({
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
        stack: err.stack,
        issues: issues
      });
}