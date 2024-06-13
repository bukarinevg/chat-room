
import ChatForm from "@components/chat-form";
import ChatMessages from "@components/chat-messages";


import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){
    

    return (
      <section className="chat__window">
        <p>Home chat page</p> 
      </section>
    );
}