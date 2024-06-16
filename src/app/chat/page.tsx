
import '@styles/chat-home.scss';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Chat Room',
  };
 
export default async function Page(){
    

    return (
      <section className="chat-window">
        <h1>Chat Homepage</h1>
        <article className="chat-window__header">
          <div className='block'>
            Users:
          </div>
          <div className='block'>
            Public chats:
          </div>
          <div className='block'>
            Yours chats:
          </div>
        </article>
      </section>
    );
}