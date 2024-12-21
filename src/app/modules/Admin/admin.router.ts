import { Router } from "express";
import auth from "../../middlewares/auth";
import { adminController } from "./admin.controller";

const adminRouter= Router();
adminRouter.patch(
    '/users/:userId/block',
    auth('admin'),
    adminController.blockUser
  );
adminRouter.delete(
    '/blogs/:id',
    auth('admin'),
    adminController.deleteBlog
  );

  export default adminRouter;