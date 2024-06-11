'use client';

import '@styles/chat-header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from '@/lib/types';

export default function ChatHeader(
    {id, name, users}: {
    id: number, 
    name: string, 
    users: UserDetails[]
}) {
    const leaveChat = () =>{
        alert('leave chat');
    }

    const showChatInfo = () => {
        alert('show users');
    };
    

    return (
        <header className="chat__header">
            <div 
                className="chat__header__left btn"
                onClick={showChatInfo}
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
                onClick={leaveChat}
            >
                    Leave Chat
            </div>
        </header>
    );
}