import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/react';
import prisma from '@/libs/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req:NextApiRequest,res:NextApiResponse)=>{
    const session = await getServerSession(req,res,authOptions);

    if(!session?.user?.email)
        throw new Error("Not signed In");

    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    });

    if(!currentUser)
        throw new Error("Not signed In");

    return {currentUser};


};

export default serverAuth;

