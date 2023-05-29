import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/db.server'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { UserName , Password, email, role } = await req.json();
    try {
        console.log("role")
        const data = await prisma.User.create({
            data:{
                UserName:UserName,
                email:email,
                Password:bcrypt.hashSync(Password, 8),
                role:role
            },
        });
        console.log("data")


        return new Response(JSON.stringify(data), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new User", { status: 500 });
    }
}

    