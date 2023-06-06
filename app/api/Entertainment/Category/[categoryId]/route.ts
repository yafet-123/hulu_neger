import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db.server";

export const GET = async (request, { params }) => {
    try {
        console.log(params.categoryId)
        const data = await prisma.EntertainmentCategory.findUnique({
            where:{
                category_id: Number(params.categoryId),
            }
        });
        console.log(data)
        if (!data) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(data), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {CategoryName} = await request.json();

    try {
        const existingCategory = await prisma.EntertainmentCategory.findUnique({
            where:{
                category_id: Number(params.categoryId),
            }
        });;

        if (!existingCategory) {
            return new Response("Category not found", { status: 404 });
        }

        // Update the prompt with new data
        const data = await prisma.EntertainmentCategory.update({
            where:{category_id:Number(params.categoryId)},
            data:{
                CategoryName
            },
        });

        return new Response("Successfully updated the Category", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Category", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const data = await prisma.EntertainmentCategory.delete({
            where:{category_id:Number(params.categoryId)},
        });

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
