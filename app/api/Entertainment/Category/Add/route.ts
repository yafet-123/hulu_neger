import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/db.server'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const {CategoryName , user_id}  = await req.json();
    try {
        console.log(CategoryName)
        const data = await prisma.EntertainmentCategory.create({
            data:{
                CategoryName:CategoryName,
                user_id:user_id
            },
        });
        console.log(data)
        return new Response(JSON.stringify(data), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Job Category", { status: 500 });
    }
}

    