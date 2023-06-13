import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const latestjobs = await prisma.Job.findMany({
      take: -10,
      orderBy: {
        ModifiedDate: "asc",
      },
      include: {
        User: {
          select: {
            UserName: true,
          },
        },
        JobLocation: {
          include: {
            Location: {
              select: {
                location_id: true,
                LocationName: true,
              },
            },
          },
        },
        JobCategory: {
          include: {
            Category: {
              select: {
                category_id: true,
                CategoryName: true,
              },
            },
          },
        },
      },
    });

    console.log(latestjobs);

    return new Response(JSON.stringify(latestjobs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
