'use server';

import { PrismaClient } from "@prisma/client";
import { Chat, UserDetails } from "@lib/types";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<Array<UserDetails>> => {
    const data = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            image: true
        }
    });
    return data as Array<UserDetails>;
}

export const getUsersInformationExceptUser = async (userId:number): Promise<Array<UserDetails>> => {
    const data = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            image: true
        },
        where:{
            id: {
                not: userId
            }
        }
    });
    return data as Array<UserDetails>;
}

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
}

export const getChats = async () => {
    return prisma.chat.findMany();
}

export const getUserChats = async (id: number) => {
    return prisma.chat.findMany({
        where:{
            users: {
                some: {
                    id: id
                }
            }
        }
    });
}

export const getChatById = async (id: string) => {
    return prisma.chat.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            users: true,
            messages: true,
        },
    });
}

export async function getMessages(chatId: number){
    return await prisma.message.findMany({
        where: {
            chatId
        },
        include: {
            user: true
        }
    });
}

export async function getPublicChats(): Promise<Array<Chat>>{
    return await prisma.chat.findMany({
        where:{
            private: false
        },
        include:{
            users: true,
            messages: true,
        }
    });
}



export async function getImageById(id: number){
    const user = await prisma.user.findUnique({
        where: {
            id
        },
    
    });
    if(user){
        return user.image;
    }
}
