import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const aisearch = await prisma.Detail.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: {
          select: {
            email: true,
          },
        },
        DetailCategory: {
          include: {
            AiCategory: {
              select: {
                category_id: true,
                CategoryName: true,
              },
            },
          },
        },
      },
    });
    const allaiserachdata = aisearch.map((data) => ({
      detail_id: data.detail_id,
      Header: data.Header,
      description: data.description,
      like: data.like,
      link: data.link,
      service: data.service,
      email: data.User?.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      Category: data.DetailCategory,
    }));
    console.log(allaiserachdata);
    return new Response(JSON.stringify(allaiserachdata), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
