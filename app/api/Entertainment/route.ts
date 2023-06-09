import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const entertainment = await prisma.Entertainment.findMany({
      orderBy: { ModifiedDate: "desc" },
    });
    return new Response(JSON.stringify(entertainment), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
