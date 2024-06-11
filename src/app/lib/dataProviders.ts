'use server';

import { PrismaClient } from "@prisma/client";
import { UserDetails } from "@lib/types";

const prisma = new PrismaClient();

export const getUsersInformation = async (): Promise<Array<UserDetails>> => {
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