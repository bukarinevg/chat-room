'use client';

import '@styles/chat-messages.scss';
import ChatMessage from '@components/chat-message';
import Spinner from '@components/spinner';
import { LoadingContext } from '@components/providers/LoadingProvider';
import { Message } from '@/lib/types';

import { useRef, useEffect, useState, useContext } from 'react';
import pubnub from '@root/pubnub';


export default function ChatMessages(
    {messages}:{messages: Array<Message> | []}
) {
    const [loading, setLoadingMessages] = useState(true);
    const [chatMessages, setMessages] = useState<Array<Message> | []>(messages);
    // const {setLoading} = useContext(LoadingContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });        
    };


    useEffect(() => {
        scrollToBottom();
        setLoadingMessages(false);
    }); 

    useEffect(() => {
        pubnub.subscribe({ channels: ['chat-channel'] });
        pubnub.addListener({
          message: (event: any) => {
            setMessages((msgs) => [...msgs, event.message]);
            console.log('event.message', event.message);
          }
        });
    
        return () => {
          pubnub.unsubscribeAll();
        };
      }, []);

    return (
        <div className='chat-messages'>
            {    
                !loading && chatMessages &&
                (                
                    chatMessages.map((message, index) => (
                        <ChatMessage key={index} i={index} message={message} />
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