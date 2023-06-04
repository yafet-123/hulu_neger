import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Header, Image, categoryId, ShortDescription, Description, user_id } =
    await req.json();
  try {
    console.log(categoryId);
    let createEntertainmentCategory = [];
    console.log(createEntertainmentCategory);
    for (let j = 0; j < categoryId.length; j++) {
      createEntertainmentCategory.push({
        user_id: Number(user_id),
        category_id: Number(categoryId[j]),
      });
    }

    console.log(createEntertainmentCategory);

    const Entertainmentdata = await prisma.Entertainment.create({
      data: {
        Header,
        Image,
        ShortDescription,
        Description,
        user_id: Number(user_id),
        EntertainmentCategoryRelationship: {
          create: createEntertainmentCategory,
        },
      },
    });
    return new Response(JSON.stringify(Entertainmentdata), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
