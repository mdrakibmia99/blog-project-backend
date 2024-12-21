import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import Blog from "../Blog/blog.model";

const deleteUser = async (
    userId: string,
  ) => {
    // check blog id from database
    const checkUserId = await User.findById(userId);
    // if blog id not fount it show a error
    if (!checkUserId) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }else if(checkUserId.isBlocked){
      throw new AppError(StatusCodes.BAD_REQUEST, 'User already blocked');}
    // update blog id from database
    const updateBlog = await User.findByIdAndUpdate(userId, {isBlocked:true}, {
      new: true,
    });
    // if blog not updated it show a error
    if (!updateBlog) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not updated');
    }
   
  };
const deleteBlog = async (
    userId: string,
  ) => {
    // check blog id from database
    const checkBlogId = await Blog.findById(userId);
    // if blog id not fount it show a error
    if (!checkBlogId) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }else if(checkBlogId.isPublished===false){
      throw new AppError(StatusCodes.BAD_REQUEST, 'Blog already deleted');}
    // update blog id from database
    const updateBlog = await User.findByIdAndUpdate(userId, {isBlocked:true}, {
      new: true,
    });
    // if blog not updated it show a error
    if (!updateBlog) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not deleted');
    }
   
  };
  export const adminService = {
    deleteUser,
    deleteBlog
  }