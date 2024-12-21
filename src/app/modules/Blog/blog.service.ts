import { StatusCodes } from 'http-status-codes';
import { IBlog, IBlogReturn } from './blog.interface';
import Blog from './blog.model';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/queryBuilder';

const createBlog = async (
  authorPayload: JwtPayload,
  payload: IBlog,
): Promise<IBlogReturn> => {
  const author = authorPayload._id;
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
const deleteBlog = async (blogId: string, loggedUser: JwtPayload) => {
  // check blog id from database
  console.log(loggedUser, 'loggedUserMail');

  const checkBlogId = await Blog.findById(blogId).populate<{
    author: { email: string; role: string };
  }>('author');
  console.log(
    checkBlogId?.author?.email,
    'checkBlogId?.author?.email',
    loggedUser.email,
    'loggedUser.email loggedUser.email',
  );
  // if blog id not fount it show a error
  if (!checkBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  } else if (checkBlogId?.author?.email !== loggedUser.email) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this blog 222',
    );
  } else if (checkBlogId?.isPublished === false) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog already deleted');
  }
  // update blog id from database
  const data = await Blog.findByIdAndUpdate(
    blogId,
    { isPublished: false },
    {
      new: true,
    },
  );
  console.log(data, 'update data');
};
const getBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content '];
  const blogs = new QueryBuilder(Blog.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sort()
  const result = await blogs.modelQuery.select('_id title content author').lean();

  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
