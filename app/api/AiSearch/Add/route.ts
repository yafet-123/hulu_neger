import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { 
		Header,
		description,
		like,
		link,
		service,
		categoryId,
		user_id
	} = await req.json();

  try {
    let createAiSearchCategory = []

	for (let j = 0; j < categoryId.length; j++) {
		createAiSearchCategory.push({
			user_id : Number(user_id),
			category_id : Number(categoryId[j]),
		})
	}

	const aisearchdata = await prisma.Detail.create({
		data:{
			Header,
			description,
			like,
			link,
			service,
			user_id:Number(user_id),
			DetailCategory:{
				create: createAiSearchCategory
			}
		}
	});
    return new Response(JSON.stringify(aisearchdata), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Job Category", { status: 500 });
  }
};
