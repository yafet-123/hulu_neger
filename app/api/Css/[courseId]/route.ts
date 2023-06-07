import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (request, { params }) => {
  try {
    console.log(params.courseId);
    const data = await prisma.CSSCourse.findUnique({
      where: {
        course_id: Number(params.courseId),
      },
    });
    console.log(data);
    if (!data) return new Response("Course Not Found", { status: 404 });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, content } = await request.json();

  try {
    const existingCourse = await prisma.CSSCourse.findUnique({
      where: {
        course_id: Number(params.courseId),
      },
    });

    if (!existingCourse) {
      return new Response("Course not found", { status: 404 });
    }

    // Update the prompt with new data
    const data = await prisma.CSSCourse.update({
      where: { course_id: Number(params.courseId) },
      data: {
        title,
        content,
      },
    });

    return new Response("Successfully updated the Course", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Course", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const data = await prisma.CSSCourse.delete({
      where: { course_id: Number(params.courseId) },
    });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
