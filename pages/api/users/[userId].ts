import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    if(req.method !== 'GET')
        return res.status(405).end();

    try {

        const {userId} =req.query;

        if(!userId || typeof userId !== 'string')
            throw new Error('Invaild Id');
        
        const exisitingUser = await prisma.user.findUnique({
            where:{
                id:userId,
            }
        });

        const followCount = await prisma.user.count({
            where:{
                followingIds:{
                    has:userId
                }
            }
        })

        return res.status(200).json({...exisitingUser,followCount});
        
        
    } catch (error) {
        console.log(error)
        res.status(400).end();
    }
    
}