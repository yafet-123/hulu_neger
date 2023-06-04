import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { LocationName, user_id, Image } = await req.json();
  try {
    console.log(Image);
    const data = await prisma.Location.create({
      data: {
        LocationName: LocationName,
        Image: Image,
        user_id: Number(user_id),
      },
    });
    console.log(data);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
