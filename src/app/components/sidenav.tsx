'use client';

import { Chat } from '@/lib/types';
import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';

export default function Sidenav(
    {chats} : {
        chats: Chat[] 
    }
){
    const [open, setOpen] = useState(false);
    console.log(chats);
    // const chats = Array.from({ length: 101 });
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