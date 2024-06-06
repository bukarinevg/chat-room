'use server';

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from 'next/navigation'
import { z } from 'zod';
import bcrypt from "bcryptjs";
import path from "path";

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
        else{
            delete userObject.password;
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



export async function saveProfileImage(
    id:string, prevState: {}, queryData: FormData
){
    const file = queryData.get('profileImage');
    
    if(file instanceof File) {
        const extension = path.extname(file.name);
        const fileName = `${id}${extension}`;
        const filePath = path.join(process.cwd(), 'public', 'images', fileName);
        console.log(filePath);
        await file.arrayBuffer().then((data) => {
            require('fs').writeFileSync(filePath, Buffer.from(data));
        });
        await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                image: fileName
            }
        });
    }
    permanentRedirect(`/chat/profile/${id}`);
    return {};
}