import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobCategory = await prisma.Category.findMany({
      orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              email:true
          }
      }
    }
    });

    return new Response(JSON.stringify(jobCategory), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
