import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    CompanyName,
    Image,
    JobsName,
    CareerLevel,
    Salary,
    Descreption,
    shortDescreption,
    DeadLine,
    categoryId,
    LocationId,
    user_id,
  } = await req.json();
  try {
    let createJobCategory = [];
    let createLocationCategory = [];

    for (let j = 0; j < categoryId.length; j++) {
      createJobCategory.push({
        user_id: Number(user_id),
        category_id: Number(categoryId[j]),
      });
    }

    for (let i = 0; i < LocationId.length; i++) {
      createLocationCategory.push({
        user_id: Number(user_id),
        location_id: Number(LocationId[i]),
      });
    }

    const Jobdata = await prisma.Job.create({
      data: {
        CompanyName,
        Image,
        JobsName,
        CareerLevel,
        Salary,
        Descreption,
        shortDescreption,
        DeadLine,
        user_id: Number(user_id),
        JobCategory: {
          create: createJobCategory,
        },
        JobLocation: {
          create: createLocationCategory,
        },
      },
    });
    return new Response(JSON.stringify(Jobdata), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
