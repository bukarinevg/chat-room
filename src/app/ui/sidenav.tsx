'use client';

import '@styles/sidenav.scss';
import React from 'react';
import { useState } from 'react';
// import SidenavMenu from '@ui/sidenav-menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Sidenav(){
    const [open, setOpen] = useState(false);

    function toggleSidenav(): void{
        setOpen(!open);
    }

    return(
        <>

            <div className='sidenav'>
                {/* <FontAwesomeIcon 
                    className='sidenav__icon'
                    icon={faBars}                      
                    aria-expanded={open} 
                    onClick={toggleSidenav}
                    aria-controls="sidenav-menu" 
                    /> */}
             
             
                    <nav 
                        className='sidenav__menu'
                        id='sidenav-menu'
                        
                    >
                        <p> chat 1</p>
                        <p>chat 2</p>
                        <p>chat 3</p>
                        <p>chaasdddddddddasdddddddddddddddddddddt 4</p>
                    </nav>
                
            </div>
        </>
    );
}