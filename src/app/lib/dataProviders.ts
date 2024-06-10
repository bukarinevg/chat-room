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