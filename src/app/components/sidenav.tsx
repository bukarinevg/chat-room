'use client';

import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';

export default function Sidenav(){
    const [open, setOpen] = useState(false);
    const chats = Array.from({ length: 101 });
    return(
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
                            className='sidenav__link' 
                            key={index}
                            style={
                                {maxWidth: open ? '200px' : '50px'}
                            }
                            
                        >
                            <a
                                title={ 
                                    'str'.repeat(index) 
                                }
                            >
                                chat {'str'.repeat(index)} 
                            </a>
                        </p>
                    ))
                }
            </nav>                
        </div>
    );
}