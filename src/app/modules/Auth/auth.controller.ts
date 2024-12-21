import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);
    const { _id, name, email } = result;
    sendResponse(res, {
      success: true,
      message: 'User created successfully',
      statusCode: StatusCodes.CREATED,
      data: { _id, name, email },
    });
  });
  const login = catchAsync(async(req: Request, res: Response)=>{
      console.log(req.body,"test login data req.body")
    const result = await authService.login(req.body);

    sendResponse(res,{
   
        success: true,
        message: "Login successful",
        statusCode: StatusCodes.OK,
        data: {
          token: result.token,
        }
    })
})



  export const authController = {
    register,
    login
  }