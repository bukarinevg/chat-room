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
                    // style={open ? {} : { display: 'none'} }
                    
                >
                        {
                        chats.map((_, index) => (
                            <p 
                                className='sidenav__text' 
                                key={index}
                                style={
                                    {maxWidth: open ? '200px' : '15px'}
                                }
                            >
                                    chat {index}
                            </p>
                        ))
                    }
                </nav>                
            </div>
        </>
    );
}