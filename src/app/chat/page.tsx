import { Metadata } from "next";
import ChatForm from "../ui/chat-form";
import ChatMessages from "../ui/chat-messages";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){

    return (
        <>
            <h1>Room</h1>
            <section>
                <article>
                    <Suspense fallback={<p>Loading...</p>}>
                        <ChatMessages />
                        <ChatForm />
                    </Suspense>
                </article>
            </section>
        </>
    );
}