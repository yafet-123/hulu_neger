import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
 
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const location = await prisma.Location.findMany({
      orderBy: { ModifiedDate: "desc" },
      include: {
        _count: {
          select: {
            JobLocation: true,
          },
        },
        User: {
          select: {
            email: true,
          },
        },
      },
    });
    console.log(location)
    const Alllocations = location.map((data) => ({
      location_id: data.location_id,
      LocationName: data.LocationName,
      Image: data.Image,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      email: data.User.email,
      count: data._count.JobLocation,
    }));
    console.log()
    return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
