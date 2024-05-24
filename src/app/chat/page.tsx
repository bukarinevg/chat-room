import { Metadata } from "next";
import ChatForm from "../ui/chat-form";
import ChatMessages from "../ui/chat-messages";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <>
            <h1>Room</h1>
            <section></section>
            <section>
                <article>
                    {user && <p>Welcome, {user.email} {user.name}!</p>}
                    <Suspense fallback={<p>Loading...</p>}>
                        <ChatMessages />
                        <ChatForm />
                    </Suspense>
                </article>
            </section>
        </>
    );
}