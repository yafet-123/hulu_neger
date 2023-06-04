import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { 
    Header,
    Image,
    ShortDescription,
    Description,
    user_id,
    categoryId
  } = await req.json();
  try {
    let createBlogCategory = []

  for (let j = 0; j < categoryId.length; j++) {
    createBlogCategory.push({
      user_id : Number(user_id),
      category_id : Number(categoryId[j]),
    })
  }

  const blogdata = await prisma.Blogs.create({
    data:{
      Header,
      Image,
      ShortDescription,
      Description,
      user_id:Number(user_id),
      BlogsCategoryRelationship:{
        create: createBlogCategory
      }
    }
  });
    return new Response(JSON.stringify(blogdata), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
