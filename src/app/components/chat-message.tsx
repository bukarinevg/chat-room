'use client';

import { Message } from '@/lib/types';
import '@styles/chat-message.scss';
import { useSession } from 'next-auth/react';

export default function ChatMessage(
    {message} : { message: Message }
){
    let isCreator = false;
    const userId = useSession()?.data?.user.id;
    if(userId && message.user.id && Number(userId) === message.user.id){
        isCreator = true;
    }


    return(
        <div className={`chat-message ${isCreator? 'chat-message__creator' : ''}`} >
            <div className='chat-message__content'>
                    {
                        ! isCreator && (
                            <div className='chat-message__author'> 
                                <img 
                                    title={message.user.name}
                                    className='chat-message__author__avatar' 
                                    src='https://loremflickr.com/320/240' 
                                    alt='Author' />
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