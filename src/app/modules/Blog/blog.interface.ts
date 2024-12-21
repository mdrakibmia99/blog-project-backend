/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";


export interface IBlog{
    title:string,
    content:string,
}

export interface IBlogReturn {
    title: string;
    content: string;
    author: Record<string, any> | undefined ; // Fully populated author
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id: Types.ObjectId
  }