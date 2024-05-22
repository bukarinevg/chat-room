'use client';

import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';

export default function Sidenav(){
    const [open, setOpen] = useState(false);

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
                        <p> chat 1</p>
                        <p>chat 2</p>
                        <p>chat 3</p>
                        <p>chaasdddddddddasdddddddddddddddddddddt 4</p>
                    </nav>

                    <nav
                        className='sidenav__menu-preview'   
                        style={open ? {display: 'none'} : {} }
                    >
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                    </nav>
                
            </div>
        </>
    );
}