'use client';

import { Message } from '@/lib/types';
import '@styles/chat-message.scss';

export default function ChatMessage(
    {message, i} : 
    {
        message: Message ,
        i: number
    }
){


    return(
        <div className='chat-message' >
            <div className='chat-message__content'>
                <div className='chat-message__author'> 
                    <img className='chat-message__author__avatar' src='https://loremflickr.com/320/240' alt='Author' />
                    <p className='chat-message__author__name'>{message.user.name}</p>
                </div>
                <p className='chat-message__text'>{message.text}</p>
            </div>
        </div>
    );
}