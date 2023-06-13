import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobCategory = await prisma.Category.findMany({
      orderBy: {
        category_id: "asc",
      },
      include: {
        User: {
          select: {
            email: true,
          },
        },
        _count:{
        select:{
          JobCategory:true
        }
      },
      },
    });

    const Allcategories = jobCategory.map((data) => ({
      category_id: data.category_id,
      CategoryName: data.CategoryName,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      email: data.User?.email,
      count:data._count.JobCategory,
    }));

    return new Response(JSON.stringify(Allcategories), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
