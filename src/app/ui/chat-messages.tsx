'use client';

import '@styles/chat-messages.scss';
import ChatMessage from './chat-message';

export default function ChatMessages() {
    return (
        <div className='chat-messages'>
            {
                Array.from({ length: 9 }).map((_, index) => (
                   <ChatMessage key={index} i={index} />
                ))
            }
        </div>
    );
}