'use server';

import { PrismaClient } from "@prisma/client";
import { permanentRedirect, redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import bcrypt from "bcryptjs";
import path from "path";
import pubnub from "@root/pubnub";
import { Message } from "./types";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const prisma= new PrismaClient();
const client = new S3Client({ region: process.env.AWS_REGION })

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
    console.log('updateUser');
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
    previousFile:string| null,
    prevState: {}, 
    queryData: FormData
){
    console.log('updateProfileImage');
    const file = queryData.get('profileImage');
    
    console.log('file', file);
    if(file instanceof File) {
        const extension = path.extname(file.name);
        const fileName = `${Date.now()}-${uuidv4()}${extension}`;
        const bucket = process.env.AWS_BUCKET_NAME ?? 'profileimagebucketeugene';

        console.log(fileName);

        const fileBuffer = await file.arrayBuffer();
        const awsFile = Buffer.from(fileBuffer);
        try {
           
            
            const uploadCommand = new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: fileName,
              Body: awsFile,
            });  
            const response = await client.send(uploadCommand);

            if(previousFile){
                await deleteImage(previousFile);
            }

            await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    image: fileName
                }
            });
            // return Response.json(response)
          } catch (error: any) {
            return Response.json({ error: error.message })
        }
    }
    redirect(`/chat/profile/${id}`);
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
        //add the current user to the chat
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

type CreateMessageFormState = {
    errors?: {
        message?: string[],
    },
    message: string | null | undefined;

}

const CreateMessageSchema = z.object({
    message: z.string({
        message: 'Type something to send the message'
    }).min(1, {
        message: 'Type something to send the message'
    }).max(4000,{
        message: 'Message should be less than 1000 symbols'
    }),

});

export async function createMessage(
    userId: number,
    chatId: number,
    prevState: CreateMessageFormState,
    queryData: FormData
){

    const validatedFields = CreateMessageSchema.safeParse({
        message: queryData.get('message'),
    });

    if(validatedFields.success){
        const {id: messageId} = await prisma.message.create({
            data: {
                text: validatedFields.data.message,
                user: {
                    connect: {
                        id: userId
                    }
                },
                chat: {
                    connect: {
                        id: chatId
                    }
                }
            }
        });

        const message = await prisma.message.findUnique({
            where: {
                id: messageId
            },
            include: {
                user: true,
            }
        });

        console.log('chat_id', chatId);
        console.log('message', message?.text);
        try {
            if(message && message.user){
                const pubMessage: Message = {
                    id: message.id,
                    text: message.text,
                    userId: message.user.id,
                    user: {
                        id: message.user.id,
                        name: message.user.name,
                        image: message.user.image
                    },
                    createdAt: message.createdAt
                } 
                const result = await pubnub.publish({
                    message: pubMessage,
                    channel: String( `chat-${chatId}`),
                    sendByPost: true, 
                });
            }
        } catch (status) {
            console.log(status);
        }  

        return {
            message: null,
            errors: {
                message: []
            }
        };
    }
    return {
        message: 'Fix the fields issues',
        errors: validatedFields?.error?.flatten().fieldErrors,
    };
}



export async function joinChat(
    userId: number,
    chatId: number
){
    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        },
        include:{
            users: true
        }
    });

    if(chat?.users.find((user) => user.id === userId)){
        redirect(`/chat/${chatId}`);
    }

    await prisma.chat.update({
        where: {
            id: chatId
        },
        data: {
            users: {
                connect: {
                    id: userId
                }
            }
        }
    });
    redirect(`/chat/${chatId}`);
}


export async function deleteImage(name: string){
   
    const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: name,
    });
    await client.send(deleteCommand);

}