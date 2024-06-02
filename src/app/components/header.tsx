"use client";

import "@styles/chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";


export default function Header({email} : {email: string | undefined | null }){
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
                <FontAwesomeIcon 
                    icon={faUser} 
                    className="header__icon" 
                    onMouseEnter={() => toggleMenu(true)} 
                />
            </div>
            
            {
                isMenuOpen && (
                    <div className="header__menu">
                        <a
                            href={'/profile'}
                        >
                            {email}
                        </a>
                        <a 
                            onClick={() => signOut({ callbackUrl })}
                            role="button"
                        > Sign Out</a>
                    </div>
                )
            }
        </header>
    )
}