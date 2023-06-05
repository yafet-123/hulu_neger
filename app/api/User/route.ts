import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.User.findMany({
      orderBy: { ModifiedDate: "desc" },
    });
    const Allusers = users.map((data) => ({
      user_id: data.user_id,
      email: data.email,
      role: data.role,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      UserName: data.UserName,
    }));
    return new Response(JSON.stringify(Allusers), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
