import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (request, { params }) => {
  try {
    console.log(params.userId);
    const data = await prisma.User.findUnique({
      where: {
        user_id: Number(params.userId),
      },
    });
    console.log(data);
    if (!data) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { UserName, email } = await request.json();

  try {
    const existingUser = await prisma.User.findUnique({
      where: {
        user_id: Number(params.userId),
      },
    });

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // Update the prompt with new data
    const data = await prisma.User.update({
      where: { user_id: Number(params.userId) },
      data: {
        UserName,
        email,
      },
    });

    return new Response("Successfully updated the User", { status: 200 });
  } catch (error) {
    return new Response("Error Updating User", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const data = await prisma.User.delete({
      where: { user_id: Number(params.userId) },
    });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
