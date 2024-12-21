import { StatusCodes } from 'http-status-codes';
import { IBlog, IBlogReturn } from './blog.interface';
import Blog from './blog.model';
import AppError from '../../errors/AppError';

const createBlog = async (
  author: string,
  payload: IBlog,
): Promise<IBlogReturn> => {
  const createBlog = await Blog.create({ ...payload, author });
  const result = await createBlog.populate('author');
  return result;
};
const updateBlog = async (
  blogId: string,
  payload: IBlog,
): Promise<IBlogReturn> => {
  // check blog id from database
  const checkBlogId = await Blog.findById(blogId);
  // if blog id not fount it show a error
  if (!checkBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // update blog id from database
  const updateBlog = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
  });
  // if blog not updated it show a error
  if (!updateBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not updated');
  }
  const result = await updateBlog.populate('author');

  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
};
