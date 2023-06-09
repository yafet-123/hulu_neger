import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const news = await prisma.News.findMany({
      orderBy: { ModifiedDate: "desc" },
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
