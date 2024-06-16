'use client';

import '@styles/sidenav.scss';
import { Chat } from '@/lib/types';
import { LoadingContext } from '@components/providers/LoadingProvider';

import React, { ReactEventHandler } from 'react';
import { useState, useContext } from 'react';
import { useRouter } from "next/navigation"

export default function Sidenav(
    {chats} : {
        chats: Chat[] 
    }
){
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { setLoading } = useContext(LoadingContext);
    

    const handleSideNavClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(!open){
            setOpen(true);
        }
        else{
            setLoading(true);
            router.push(e.currentTarget.getAttribute('href')?? '/chat/' );
            
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
                    <p 
                        className='sidenav__link'
                        style={
                            {maxWidth: open ? '200px' : '50px'}
                        }
                    >
                        <a 
                            onClick={handleSideNavClick}
                            href='/chat/'
                            title='Home'
                        >
                            Home
                        </a>
                    </p>
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