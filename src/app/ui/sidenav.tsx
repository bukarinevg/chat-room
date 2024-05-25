'use client';

import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';

export default function Sidenav(){
    const [open, setOpen] = useState(false);
    const chats = Array.from({ length: 20 });
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
                                <p>chat {index}</p>
                            ))
                        }
                    </nav>

                    <nav
                        className='sidenav__menu-preview'   
                        style={open ? {display: 'none'} : {} }
                    >
                        {
                            chats.map((_, index) => (
                                <p>{index}</p>
                            ))
                        }
                    </nav>
                
            </div>
        </>
    );
}