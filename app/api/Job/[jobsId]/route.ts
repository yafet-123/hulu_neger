import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (request, { params }) => {
  try {
    console.log(params.jobsId);

    const updateview = await prisma.Job.update({
      where:{job_id : Number(params.jobsId),},
      data: { view: { increment: 1 }, },
    })

    const jobs = await prisma.Job.findUnique({
      where: {
        job_id: Number(params.jobsId),
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

    if (!jobs) return new Response("Jobs Not Found", { status: 404 });

    const onedata = {
      job_id:jobs.job_id,
      CompanyName:jobs.CompanyName,
      image:jobs.Image,
      JobsName:jobs.JobsName,
      CareerLevel:jobs.CareerLevel,
      Salary:jobs.Salary,
      Descreption:jobs.Descreption,
      shortDescreption:jobs.shortDescreption,
      DeadLine:jobs.DeadLine,
      Apply:jobs.Apply,
      view:jobs.view,
      userName:jobs.User.UserName,
      CreatedDate:jobs.CreatedDate,
      ModifiedDate:jobs.ModifiedDate,
      Location:jobs.JobLocation,
    }
    console.log(jobs)
    return new Response(JSON.stringify(jobs), { status: 200 });
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