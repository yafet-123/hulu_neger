import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (request, { params }) => {
  try {
    console.log(params.jobsId);
    const jobs = await prisma.Job.findUnique({
      where: {
        course_id: Number(params.jobsId),
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

    if (!jobs) return new Response("Course Not Found", { status: 404 });

     const job = jobs.map((data) => ({
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

    return new Response(JSON.stringify(job), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const data = await prisma.Job.delete({
      where: { job_id: Number(params.jobsId) },
    });

    return new Response("Job deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Job", { status: 500 });
  }
};