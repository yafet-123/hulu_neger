import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/db.server'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  	const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
    return new Response(JSON.stringify(users), { status: 200 })
}

