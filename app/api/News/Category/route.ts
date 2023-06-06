import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newsCategory = await prisma.NewsCategory.findMany({
      orderBy: { ModifiedDate: "desc" },
      include:{
        User:{
          select:{
              email:true
          }
        }
      },
    });
    
    return new Response(JSON.stringify(newsCategory), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
