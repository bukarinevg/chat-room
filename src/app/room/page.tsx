import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default function Page(){
    return (
        <div className="p-3">
            <h1>Room</h1>
            <article className="ml-5">
                <p>Room</p>
            </article>
        </div>
    );
}