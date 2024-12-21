import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';

const blogRouter = Router();

blogRouter.patch(
  '/:id',
  auth('user'),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.updateBlog,
);

blogRouter.post(
  '/',
  auth('user', 'admin'),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);

export default blogRouter;
