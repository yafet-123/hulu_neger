import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/db.server'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  	try {
      	const aiCategory = await prisma.AiCategory.findMany({orderBy : {updatedAt:'desc'}});
        return new Response(JSON.stringify(aiCategory), { status: 200 })
  	}catch (error) {
    	return new Response("Failed to fetch all prompts", { status: 500 })
  	}
}