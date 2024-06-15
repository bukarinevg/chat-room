'use client';

import '@styles/chat-messages.scss';
import ChatMessage from '@components/chat-message';
import Spinner from '@components/spinner';
import { LoadingContext } from '@components/providers/LoadingProvider';
import { Message } from '@/lib/types';

import { useRef, useEffect, useState, useContext } from 'react';


export default async function ChatMessages(
    {messages}:{messages: Array<Message> | null}
) {
    const [loading, setLoadingMessages] = useState(true);
    // const {setLoading} = useContext(LoadingContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });        
    };


    useEffect(() => {
        scrollToBottom();
        setLoadingMessages(false);
    }); 


    return (
        <div className='chat-messages'>
            {    
                !loading && messages &&
                (                
                    messages.map((message, index) => (
                        <ChatMessage message={index} i={index} />
                ))
                )
            }
            {
                loading && (
                    <Spinner />
                )
            }
            <div ref={messagesEndRef} className='chat-messages__point'></div>
        </div>
    );
}