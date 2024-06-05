"use client";

import "@styles/chat.scss";
import Button from "@components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";


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
            <div>
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className="header__icon" 
                />
            </div>
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