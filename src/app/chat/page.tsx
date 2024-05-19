import { Metadata } from "next";
import ChatForm from "../ui/chat-form";
export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default function Page(){
    return (
        <div className="p-3">
            <h1>Room</h1>
            <section>
                <article className="ml-5">
                    <ChatForm />
                </article>
            </section>
        </div>
    );
}