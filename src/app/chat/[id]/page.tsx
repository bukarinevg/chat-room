import { Metadata } from "next";
import { Suspense } from "react";

import ChatHeader from "@components/chat-header";
import ChatForm from "@components/chat-form";
import ChatMessages from "@components/chat-messages";
import { getChatById } from "@/lib/dataProviders";
import { UserDetails, UserSesionInterface } from "@/lib/types";

import { notFound } from 'next/navigation'
import { auth } from "@/lib/auth";



export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(
    { params }: { params: { id: string } }
){
  const chat = await getChatById(params.id);

  if(!chat) {
    return notFound();
  }

  const user = await auth();
  const userId= Number(user?.user?.id);

  
  const chatUsers: UserDetails[] = chat.users.map((user) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  });

  if(userId && ! chatUsers.find(user => user.id === userId) ){
    return notFound();
  }


  return (
    <section className="chat__window">
      {/* <Suspense fallback={
        <Spinner />
      }> */}
            <Suspense>
              <ChatHeader 
                chatId = { chat.id }
                name  = {chat.name}
                users ={chatUsers}
            />
              <ChatMessages />
              <ChatForm />
            </Suspense>
  
      {/* </Suspense>    */}
    </section>
  );
}