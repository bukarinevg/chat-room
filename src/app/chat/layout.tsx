"use client";

import "@styles/chat.scss";
import Sidenav from "@ui/sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";


export default function Layout(
    { children }: { children: React.ReactNode }
){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const callbackUrl = "/";
    
    return(
        <>
            <header>
                <p><FontAwesomeIcon icon={faPlus} className="header__icon" /> </p>
                
                <FontAwesomeIcon icon={faUser} className="header__icon" onClick={toggleMenu} />
                {
                    isMenuOpen && (
                        <div className="header__menu">
                            <a 
                                onClick={() => signOut({ callbackUrl })}
                                role="button"
                            > Sign Out</a>
                        </div>
                    )
                }
            </header>
            <main>
                <Sidenav />
                <div className="content">{children}</div>
            </main>
        </>

    )
}