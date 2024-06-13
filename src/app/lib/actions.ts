'use server';

import { PrismaClient } from "@prisma/client";
import { permanentRedirect, redirect } from 'next/navigation'
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
    name: z.string().min(3, 
        {message: 'Name should at least 3 symbols'}
    ).max(20),
    password: z.string().min(8,
        {message: 'Password should at least 8 symbols'}
    ).optional().or(z.literal('')), 
});

  
export async function updateUser(
    id:number, 
    prevState: UpdateUserFormState, 
    queryData: FormData
) {
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



export async function updateProfileImage(
    id:string, 
    prevState: {}, 
    queryData: FormData
){
    const fs= require('fs');
    const file = queryData.get('profileImage');
    
    
    if(file instanceof File) {
        const extension = path.extname(file.name);
        const fileName = `${id}${extension}`;
        const uploadDir = path.join(process.cwd(), 'public', 'images');
        const filePath = path.join(process.cwd(), 'public', 'images', fileName);

        // console.log('cwd', process.cwd());
        // console.log('dirname', __dirname);
        // console.log('path',filePath);
        // console.log('dir', fs.readdirSync(process.cwd()));

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        await file.arrayBuffer().then((data) => {
            fs.writeFileSync(filePath, Buffer.from(data));
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

type CreateChatFormState = {
    errors?: {
        name?: string[],
        users?: string[],
    },
    message: string | null | undefined;
}

const CreateChatSchema = z.object({
    name: z.string().min(3,{
        message: 'Name should at least 3 symbols'
    }).max(20),
    private: z.string().optional().nullable(),
    users: z.array(z.string().min(1,  
        {message: 'Please select at least one user'}
    ),) ,
});

export async function createChat(
    userId: number,
    prevState: CreateChatFormState,
    queryData: FormData
) : Promise<CreateChatFormState>{

    const validatedFields = CreateChatSchema.safeParse({
        name: queryData.get('name'),
        private: queryData.get('private'),
        users: queryData.getAll('users'),
    })

    if(validatedFields.success){
        const result =  await prisma.chat.create({
            data: {
                name: validatedFields.data.name,
                private: validatedFields.data.private === '1',
                users: {
                    connect: 
                    validatedFields.data.users.map(
                        (userId) => 
                        ({id: parseInt(userId)})
                    )

                }
            }   
        });
        await prisma.chat.update({
            where: {
                id: result.id
            },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        
        });
        redirect(`/chat/${result.id}`);     
    }
    
    return {
        message: 'Fix the fields issues',
        errors: validatedFields?.error?.flatten().fieldErrors,
    };
}

export async function leaveChat(
    userId: number,
    chatId: number
){
    const updateResult = await prisma.chat.update({
        where: {
            id: chatId
        },
        data: {
            users: {
                disconnect: {
                    id: userId
                }
            }
        }
    });

    console.log('updateResult', updateResult);

    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        },
        include: {
            users: true
        }
    
    });

    console.log('chat', chat);

    if(chat?.users.length === 0){
        await deleteChat(chatId);
    }
    redirect('/chat');
}

export async function deleteChat(id: number){
    await prisma.chat.delete({
        where: {
            id
        }
    });
    redirect('/chat');

}