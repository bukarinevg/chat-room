'use client';

import '@styles/chat-messages.scss';
import ChatMessage from '@components/chat-message';
import Spinner from '@components/spinner';
import { LoadingContext } from '@components/providers/LoadingProvider';
import { Message } from '@/lib/types';

import { useRef, useEffect, useState, useContext } from 'react';
import pubnub from '@root/pubnub';


export default function ChatMessages(
    {messages, chatId}:{messages: Array<Message> | [], chatId: number}
) {

    const [loading, setLoadingMessages] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });        
    };
    useEffect(() => {
        scrollToBottom();
        setLoadingMessages(false);
    }); 

    const [chatMessages, setMessages] = useState<Array<Message> | []>(messages);
    useEffect(() => {
        pubnub.subscribe({ channels: [`chat-${chatId}`] });
        pubnub.addListener({
          message: (event: any) => {
            setMessages(
                (currentMessages) => {
                if (event.message.id !== currentMessages[currentMessages.length - 1]?.id) {
                  return [...currentMessages, event.message];
                }
                return currentMessages;
              });
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
                        <ChatMessage key={index} message={message} />
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