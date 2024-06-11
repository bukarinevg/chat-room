'use client';

import '@styles/chat-header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from '@/lib/types';
import Modal from './modal';
import { useState } from 'react';
import { leaveChat } from '@/lib/actions';

export default function ChatHeader(
    {userId, chatId, name, users}: {
    userId: number,
    chatId: number, 
    name: string, 
    users: UserDetails[]
}) {
    
    const [showChatInfo, setShowChatInfo] = useState(false);

    const leaveChatHandle = () =>{
        leaveChat(userId, chatId)
    }

    const showChatInfoHandle = () => {
        setShowChatInfo(true);
    };
    

    return (
        <header className="chat__header">
            <div 
                className="chat__header__left btn"
                onClick={showChatInfoHandle}
            >
                <h2>
                    {name}
                </h2>
                <span 
                    className='chat__header__left__users'
                >
                    {users.length}
                    <FontAwesomeIcon icon={faUsers} className='chat__header__left__icon'/>
                </span>
            </div>
            <div 
                className="chat__header__right btn"
                onClick={leaveChatHandle}
            >
                    Leave Chat
            </div>

            <Modal
                show={showChatInfo}
                onClose={() => setShowChatInfo(false)}
                title={name}
                className='chat-info-modal'
            >
                <div className='chat-info-modal__body'>
                    <h2
                        className='chat-info-modal__body__title'
                    >Users:</h2>
                    <ul>
                        {
                            users.map((user,index) => (
                            <li 
                                className='chat-info-modal__body__user'
                                key={user.id}
                            >
                                <span 
                                    className='chat-info-modal__body__user-index'
                                >
                                    {index+1}
                                </span>
                                <a 
                                    className='chat-info-modal__body__user-name'
                                    title={user.email}
                                >
                                    {user.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </header>
    );
}