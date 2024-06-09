"use client";

import "@styles/chat.scss";
import HeaderAddChat from "@components/header-add-chat";

import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Header(
    {id, email} : 
    {
        id?: string | null,
        email: string | undefined | null,
       
     }
){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (state: boolean) => {
      setIsMenuOpen(state);
    };


    const callbackUrl = "/";

    
    return(
        <header onMouseLeave={() => toggleMenu(false)}  >
            <HeaderAddChat />

            
            <div>
                <a
                    href={`/chat/profile/${id}`}
                >
                    <FontAwesomeIcon 
                        icon={faUser} 
                        className="header__icon" 
                        onMouseEnter={() => toggleMenu(true)} 
                    />
                </a>
            </div>
            
            {
                isMenuOpen && (
                    <div className="header__menu">
                        <a
                            className="button"
                            href={`/chat/profile/${id}`}
                        >
                            {email}
                        </a>
                        <a 
                        className="button header__menu__sign-out"
                            onClick={() => signOut({ callbackUrl })}
                        > Sign Out
                        </a>
                    </div>
                )
            }
        </header>
    )
}