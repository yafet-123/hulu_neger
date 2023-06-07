import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobs = await prisma.Job.findMany({
      orderBy: {
        job_id: "asc",
      },
      include: {
        User: {
          select: {
            email: true,
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

    const Alljobs = jobs.map((data) => ({
      job_id: data.job_id,
      CompanyName: data.CompanyName,
      image: data.Image,
      JobsName: data.JobsName,
      CareerLevel: data.CareerLevel,
      Salary: data.Salary,
      Descreption: data.Descreption,
      shortDescreption: data.shortDescreption,
      DeadLine: data.DeadLine,
      Apply: data.Apply,
      view: data.view,
      email: data.User.email,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      categories: data.JobCategory,
      Location: data.JobLocation,
    }));

    return new Response(JSON.stringify(Alljobs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
