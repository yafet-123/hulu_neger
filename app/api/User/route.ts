import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prismaClient'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  	try {
      	const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
        return new Response(JSON.stringify(users), { status: 200 })
  	}catch (error) {
    	return new Response("Failed to fetch all prompts", { status: 500 })
  	}
}