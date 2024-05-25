'use client';

import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';

export default function Sidenav(){
    const [open, setOpen] = useState(false);
    const chats = Array.from({ length: 101 });
    return(
        <>

            <div 
                className='sidenav'  
                onMouseEnter={() => setOpen(true) } 
                onMouseLeave={() => setOpen(false)} 
            >
                    <nav 
                        className='sidenav__menu'
                        id='sidenav-menu'
                        style={open ? {} : { display: 'none'} }
                        
                    >
                          {
                            chats.map((_, index) => (
                                <div key={index}>chat {index}</div>
                            ))
                        }
                    </nav>

                    <nav
                        className='sidenav__menu-preview'   
                        style={open ? {display: 'none'} : {} }
                    >
                        {
                            chats.map((_, index) => (
                                <p key={index}>{index}</p>
                            ))
                        }
                    </nav>
                
            </div>
        </>
    );
}