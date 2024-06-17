'use client';

import '@styles/chat-message.scss';
import logo from '@public/images/profile-default.jpg';
import { Message } from '@/lib/types';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function ChatMessage(
    {message} : { message: Message }
){
    let isCreator = false;
    const userId = useSession()?.data?.user.id;
    if(!message.user){
        return null;
    }

    if(userId && message.user.id && Number(userId) === message.user.id){
        isCreator = true;
    }

    if(message.user.image && !message.user.image.includes('http')){
        message.user.image = process.env.NEXT_PUBLIC_AWS_S3_URL + message.user.image;
    }

    const image = message.user.image ?? logo;

    return(
        <div className={`chat-message ${isCreator? 'chat-message__creator' : ''}`} >
            <div className='chat-message__content'>
                    {
                        ! isCreator && (
                            <div className='chat-message__author'> 
                                <Image 
                                    title={message.user.name}
                                    className='chat-message__author__avatar' 
                                    src={image}
                                    alt='Author'
                                    width={50}
                                    height={50}
                                 />
                            </div>
                        )
                    }
                <div  className={`chat-message__text ${isCreator? 'chat-message__text__creator': ''}`}>
                    {
                        ! isCreator && (
                            <p className='chat-message__text__author'>{message.user.name}</p>
                        )
                    }
                    <p>{message.text}</p>
                    <p className={`chat-message__text__date${isCreator? '__creator' : ''}`}>
                        {new Date(message.createdAt).toLocaleString('en-US', {
                            month: 'short', 
                            day: '2-digit',
                            hour: '2-digit', 
                            minute: '2-digit',
                        })}
                    </p>
                </div>
                
            </div>
        </div>
    );
}