import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';

const blogRouter = Router();
blogRouter.get('/',blogController.getBlogs);
blogRouter.patch(
  '/:id',
  auth('user','admin'),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.updateBlog,
);
blogRouter.delete(
  '/:id',
  auth('user','admin'),
  blogController.deleteBlog,
);

blogRouter.post(
  '/',
  auth('user', 'admin'),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);


export default blogRouter;
