import { Metadata } from "next";
import { Suspense } from "react";


import ChatForm from "@components/chat-form";
import ChatMessages from "@components/chat-messages";



export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){
    

    return (
     <section className="chat__window">
        <Suspense fallback={<p>Loading...</p>}>
            <ChatMessages />
            <ChatForm />
        </Suspense>   
      </section>
    );
}