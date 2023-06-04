import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const python = await prisma.PythonCourse.findMany({
      orderBy: { ModifiedDate: "desc" },
    });
    return new Response(JSON.stringify(python), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
