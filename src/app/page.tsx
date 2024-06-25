'use client';
import Image from "next/image";
import '@styles/main.scss';
import Button from "@components/button";
import AuthModal from "@components/auth-modal";
import { useEffect, useState } from "react";
import Card from "./components/card";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const callbackUrl = "/chat";

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setShowModal(true);
  //   }, 1500
  //   )
  // }, []);


  return (
    <main className="content">

      <section className="chat__description block">
        <h1 className="chat__description__header"> Chat application</h1>
        <article className="chat__description__cards">
          <Card
            title= "Stack"
          >
            NEXTJS, NEXTAUTH, TYPESCRIPT,<br></br> 
            POSTGRESQL, SCSS, VERCEL, AWS S3
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
           This is life-time chat allows you to create chatrooms.<br></br> 
           You can create a new chat room, invite your friends and start chatting. 
          </Card>

        </article>
      </section>
      <section className="chat__usage block" >
        <Card title="Let's go!">
          <div className="chat__usage__content">
          To start using the application, please sign in with google account.
          <br></br>
          I just want to make sure that you are not a robot.
          <br></br>
          And get your name and email to create a chat room.
          <Button 
            className="chat__usage__proceed"
            onClick={
              () => 
                  signIn("google", { 
                      callbackUrl,
                      redirect: false
              })

          }
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
