'use client';
import Image from "next/image";
import '@styles/main.scss';
import Button from "@components/button";
import AuthModal from "@components/auth-modal";
import { useEffect, useState } from "react";
import Card from "./components/card";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <h1 className="chat__description__header"> Chat application</h1>
        <article className="chat__description__cards">
          <Card
            title= "Stack"
          >
            NEXTJS, NEXTAUTH, TYPESCRIPT,<br></br> 
            POSTGRESSQL, SCSS,  VERCEL 
          </Card>
          <Card
            title= "Links"
          >
            <div className="chat__description__links">
              <div>
                <a className="chat__description__links__text" href='https://github.com/bukarinevg/chat-room'> 
                <FontAwesomeIcon
                  className="chat__description__links__icon" 
                  icon={faGithub} 
                />
                <span 
                  className="chat__description__links__text"
                >
                 source code 
                </span> 
                </a> 
              </div>
              <div>
                <a className="" href='https://github.com/bukarinevg/chat-room'>
                <FontAwesomeIcon 
                  icon={faGithub} 
                  className="chat__description__links__icon"
                />  
                  <span 
                    className="chat__description__links__text"
                  >
                  GitHub account
                  </span> 
                </a> 
              </div>

            </div>
            
          </Card>
          <Card
            title= "Description"
          >
           This application allows users to create chatrooms with different users.<br></br> 
           You can create a new chat room, invite your friends and start chatting. 
          </Card>

        </article>
      </section>
      <section className="chat__usage block" >
        <Card title="Let's go!">
          <div className="chat__usage__content">
          To start using the application, please sign in with google account, or create account.
          <Button 
            className="chat__usage__proceed"
            onClick={() => setShowModal(true)}
          > Proceed </Button> 
          </div>
        </Card>
        <AuthModal 
          show={showModal} 
          onClose={() => setShowModal(false)}
        />
      </section>
    </main>
  );
}
