'use client';

import '@styles/chat-messages.scss';
import { useRef, useEffect, useState, useContext } from 'react';
import ChatMessage from './chat-message';
import { LoadingContext } from '@components/providers/LoadingProvider';
import { set } from 'zod';
import Spinner from './spinner';

export default function ChatMessages() {
    const [loading, setLoadingMessages] = useState(true);
    // const {setLoading} = useContext(LoadingContext);
    let messages = Array.from({ length: 10 }).reverse();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        
    };

    useEffect(() => {
        scrollToBottom();
        setLoadingMessages(false);
    }, [messages]);

    return (
        <div className='chat-messages'>
            {    
                !loading &&
                (                
                    messages.map((_, index) => (
                        <ChatMessage key={index} i={index} />
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