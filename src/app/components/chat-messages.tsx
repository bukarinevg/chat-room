'use client';

import '@styles/chat-messages.scss';
import { useRef, useEffect, useState } from 'react';
import ChatMessage from './chat-message';
import Spinner from './spinner';

export default function ChatMessages() {
    const [Loading, setLoading] = useState(true);

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
                !Loading && (
                    messages.map((_, index) => (
                    <ChatMessage key={index} i={index} />
                    ))
                )
            }
            {
                Loading && (
                    <Spinner 
                        // height='300px'
                        // width='400px'
                    />
                )
            }
            <div ref={messagesEndRef} className='chat-messages__point'></div>
        </div>
    );
}