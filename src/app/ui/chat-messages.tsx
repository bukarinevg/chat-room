'use client';

import '@styles/chat-messages.scss';
import { useRef, useEffect } from 'react';
import ChatMessage from './chat-message';

export default function ChatMessages() {
    let messages = Array.from({ length: 9 });
    messages= messages.reverse();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      useEffect(() => {
        scrollToBottom();
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