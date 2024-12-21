import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../user/user.validation";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const authRouter = Router();
authRouter.post("/register",
    validateRequest(userValidation.userValidationSchema),
    authController.register

)
authRouter.post("/login",
    validateRequest(authValidation.loginValidationSchema),
    authController.login

)
export default authRouter;