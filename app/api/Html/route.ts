import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const html = await prisma.HTMLCourse.findMany({
      orderBy: {
        course_id: "asc",
      },
      include: {
        User: {
          select: {
            UserName: true,
          },
        },
      },
    });

    const Allcourses = courses.map((data) => ({
      course_id: data.course_id,
      title: data.title,
      content: data.content,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      userName: data.User.UserName,
    }));
    console.log(Allcourses);
    return new Response(JSON.stringify(Allcourses), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
