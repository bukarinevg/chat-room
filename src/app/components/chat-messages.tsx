'use client';

import '@styles/chat-messages.scss';
import ChatMessage from '@components/chat-message';
import Spinner from '@components/spinner';
import { LoadingContext } from '@components/providers/LoadingProvider';

import { useRef, useEffect, useState, useContext } from 'react';

export default function ChatMessages() {
    const [loading, setLoadingMessages] = useState(true);
    // const {setLoading} = useContext(LoadingContext);
    let messages = Array.from({ length: 10 }).reverse();

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