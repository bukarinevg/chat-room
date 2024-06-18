'use client';

import '@styles/chat-messages.scss';
import ChatMessage from '@components/chat-message';
import Spinner from '@components/spinner';
import { Message } from '@/lib/types';

import { useRef, useEffect, useState, useContext } from 'react';
import pubnub from '@root/pubnub';
import { useSession } from 'next-auth/react';


export default function ChatMessages(
    {messages, chatId}:{messages: Array<Message> | [], chatId: number}
) {

    const [loading, setLoadingMessages] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const audioReceiveRef = useRef<HTMLAudioElement|null>(null);
    const audioSendRef = useRef<HTMLAudioElement|null>(null);
    const user = useSession()?.data?.user;


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
                  if(audioReceiveRef && audioReceiveRef?.current && audioSendRef && audioSendRef.current){
                    console.log(`user?.id event.message.user.id ${user?.id} ${event.message.user.id}`);

                    if(user?.id != event.message.user.id){
                      audioReceiveRef.current.play();
                    }
                    else{
                      audioSendRef.current.play();
                    }
                  }
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
          <audio style={{display:'none'}} ref={audioReceiveRef} src='/notification.mp3' />
          <audio style={{display:'none'}} ref={audioSendRef} src='/send.mp3' />

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