'use server';

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from 'next/navigation'
import { z } from 'zod';
import bcrypt from "bcryptjs";

const prisma= new PrismaClient();

type UpdateUserFormState = {
    errors?: {
        name?: string[],
        password?: string[],
    },
    message: string | null | undefined;
}

const UpdateUserSchema = z.object({
    name: z.string().min(3).max(20),
    password: z.string().min(8).optional().or(z.literal('')), 
});

  
export async function updateUser(id:number, prevState: UpdateUserFormState, queryData: FormData) {
    const validatedFields = UpdateUserSchema.safeParse({
        name: queryData.get('name'),
        password: queryData.get('password')
    });

    if(validatedFields.success){
        const userObject = {
            name: validatedFields.data.name,
            password: validatedFields.data.password
        
        }
        if(validatedFields.data.password){
            userObject.password = await bcrypt.hash(validatedFields.data.password, 10);
        }
        await prisma.user.update({
            where: {
                id
            },
            data: userObject
        });

        permanentRedirect('/chat');
    }
    return {
        message:null,
        // message: 'Fix the fields issues',
        errors: validatedFields?.error?.flatten().fieldErrors,
    };

}
