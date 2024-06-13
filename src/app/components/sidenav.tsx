'use client';

import '@styles/sidenav.scss';
import { Chat } from '@/lib/types';

import React, { ReactEventHandler } from 'react';
import { useState } from 'react';

export default function Sidenav(
    {chats} : {
        chats: Chat[] 
    }
){
    const [open, setOpen] = useState(false);

    const handleSideNavClick = (e: React.MouseEvent<HTMLElement>) => {
        if(!open){
            e.preventDefault();
            setOpen(true);
        }
    };


    return(
        <div 
            className='sidenav'  
            onMouseEnter={() => setOpen(true) } 
            onMouseLeave={() => setOpen(false)} 
        >
            <div className='sidenav__line'></div>
            <nav 
                className='sidenav__menu'
                id='sidenav-menu'
            >
                    {
                    chats.map((chat, index) => (
                        <p
                            className='sidenav__link' 
                            key={index}
                            style={
                                {maxWidth: open ? '200px' : '50px'}
                            }
                        >
                            <a
                                onClick={handleSideNavClick}
                                href={`/chat/${chat.id}`}
                                title={ 
                                    chat.name
                                }
                            >
                               {chat.name}
                            </a>
                        </p>
                    ))
                }
            </nav>                
        </div>
    );
}