import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, user_id } = await req.json();
  try {
    const htmldata = await prisma.HTMLCourse.create({
      data: {
        title,
        content,
        user_id: Number(user_id),
      },
    });
    return new Response(JSON.stringify(htmldata), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
