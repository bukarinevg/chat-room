'use client';

import '@styles/chat-messages.scss';
import { useRef, useEffect, useState, useContext } from 'react';
import ChatMessage from './chat-message';
import { LoadingContext } from '@components/providers/LoadingProvider';

export default function ChatMessages() {
    const {loading, setLoading} = useContext(LoadingContext);

    let messages = Array.from({ length: 10 });

    messages= messages.reverse();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      useEffect(() => {
        scrollToBottom();
        setLoading(false);
      }, [messages]);
    

    return (
        <div className='chat-messages'>
            {            
                messages.map((_, index) => (
                <ChatMessage key={index} i={index} />
                ))   
            }
            <div ref={messagesEndRef} className='chat-messages__point'></div>
        </div>
    );
}