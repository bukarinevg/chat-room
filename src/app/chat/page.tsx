import { Metadata } from "next";
import { Suspense } from "react";


import ChatForm from "../ui/chat-form";
import ChatMessages from "../ui/chat-messages";



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