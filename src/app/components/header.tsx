"use client";

import "@styles/chat.scss";

import AddChat from "@components/add-chat";

import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";   
import { UserDetails } from "@/lib/types";


export default function Header(
    {id, email, users} : 
    {
        id?: string | null,
        email: string | undefined | null,
        users: UserDetails[]
     }
){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (state: boolean) => {
      setIsMenuOpen(state);
    };

    const callbackUrl = "/";

    return(
        <header onMouseLeave={() => toggleMenu(false)}  >
            <AddChat users={users} />
            <div>
                {new Date().getHours()}:{new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}
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
                    <div className="header__menu__wrapper">
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
                    </div>
                )
            }
        </header>
    )
}