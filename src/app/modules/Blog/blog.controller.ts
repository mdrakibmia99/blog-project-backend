import catchAsync from '../../utils/catchAsync';
import { blogService } from './blog.service';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req, res) => {
  const data = req.body;
  const author = req?.user?._id as string | undefined;
  if (!author) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to access this route',
    );
  }
  const result = await blogService.createBlog(author, data);
  const { _id, author: blogAuthor, content, title } = result;
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, author: blogAuthor, content, title },
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const payload = req.body;
  const result = await blogService.updateBlog(blogId, payload);
  const { _id, author: blogAuthor, content, title } = result;
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: { _id, author: blogAuthor, content, title },
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const user =req?.user?.email
   await blogService.deleteBlog(blogId,user);
 
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
