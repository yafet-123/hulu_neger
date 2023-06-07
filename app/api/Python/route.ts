import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const python = await prisma.PythonCourse.findMany({
      orderBy: { ModifiedDate: "desc" },
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
    });

    const Allcourses = python.map((data) => ({
      course_id: data.course_id,
      title: data.title,
      content: data.content,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      email: data.User?.email,
    }));
    return new Response(JSON.stringify(Allcourses), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
