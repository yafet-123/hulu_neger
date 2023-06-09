import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const PATCH = async (request, { params }) => {
  const { title, content } = await request.json();

  try {
    const existingCourse = await prisma.HTMLCourse.findUnique({
      where: {
        course_id: Number(params.locationId),
      },
    });

    if (!existingCourse) {
      return new Response("Course not found", { status: 404 });
    }

    // Update the prompt with new data
    const data = await prisma.HTMLCourse.update({
      where: { course_id: Number(params.locationId) },
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
    const data = await prisma.Location.delete({
      where: { location_id: Number(params.locationId) },
    });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
