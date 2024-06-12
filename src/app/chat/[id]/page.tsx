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
  const session: UserSesionInterface | null = await auth() as UserSesionInterface;
  const chat = await getChatById(params.id);

  if(!chat) {
    return notFound();
  }

  const chatUsers: UserDetails[] = chat.users.map((user) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  });

  return (
    <section className="chat__window">
      {/* <Suspense fallback={
        <Spinner />
      }> */}
          <ChatHeader 
            userId={Number(session.user.id)}
            chatId = { chat.id }
            name  = {chat.name}
            users ={chatUsers}
          />
          <ChatMessages />
          <ChatForm />
      {/* </Suspense>    */}
    </section>
  );
}