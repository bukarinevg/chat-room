'use client';

import React from 'react';

export default function SidenavMenu(){
    return(
        <nav 
            className='sidenav__menu'  
            id='sidenav-menu'
        >
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
}