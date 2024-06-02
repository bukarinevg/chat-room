'use client';
import Image from "next/image";
import '@styles/main.scss';
import Button from "@components/button";
import AuthModal from "@components/auth-modal";
import { useEffect, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setShowModal(true);
    }, 1500
    )
  }, []);


  return (
    <main className="content">
        <section className="chat__description block">
          <h1 className="chat__description__header">Chat application</h1>
          <p className="chat__description__stack"> <span>STACK</span>: NEXT, SCSS, TS, POSTGRESSQL</p>
          <div className="chat__description__text">
            {/* This is a simple chat application that allows you to send messages to your friends. You can create a new chat room, invite your friends and start chatting. The application is built using Next.js, SCSS, TypeScript and PostgresSQL.  */}
            <p>
              This is application that allows to create chatrooms with different users. 
            </p>
            <p>
             You can create a new chat room, invite your friends and start chatting.
            </p>
            <p>
              The application is hosted on Vercel. 
            </p>
            <p>
              You can find the
              <a className="chat__description__link" href='https://github.com/bukarinevg/chat-room'> source code </a> 
              on my 
              <a className="chat__description__link" href='https://github.com/bukarinevg'>  GitHub account. </a>
            </p> 
          </div>
        </section>
        <section className="chat__usage block" >
          <p>
            To contnue you need to login, with google or facebook account,<br></br>
            or use test account.
          </p>
          <Button 
            className="chat__usage__proceed"
            onClick={() => setShowModal(true)}
          > Proceed </Button> 
          <AuthModal 
            show={showModal} 
            onClose={() => setShowModal(false)}
          />
        </section>

          

    </main>
  );
}
