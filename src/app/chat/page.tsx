
import '@styles/chat-home.scss';
import { Metadata } from "next";
import { getPublicChats, getUserChats, getUsers } from '@lib/dataProviders';
import { auth } from '@/lib/auth';
import Card from '@components/card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faComments,  faUsers } from '@fortawesome/free-solid-svg-icons';
import ChatPublicTable from '../components/chat-public-table';


export const metadata: Metadata = {
    title: 'Chat Homepage',
  };
 
export default async function Page(){
  const user = await auth();
  const userId= Number(user?.user?.id);  
  const chats = await getPublicChats();
  const users = (await getUsers()).length;
  const publicChats = chats.length;
  const userChats = (await getUserChats(Number(userId))).length;

  
  return (
    <section className="chat-window">
      <h1 className='chat-window__header'>Chat Homepage</h1>
      <article className="chat-window__cards">
        <Card title='Users'>
          {users} <FontAwesomeIcon className='chat-window__icon' icon={faUsers} />
        </Card>
        <Card title='Public Chats'>
          {publicChats}  <FontAwesomeIcon className='chat-window__icon' icon={faComments} />
        </Card>
        <Card title='Your Chats'>
          {userChats} <FontAwesomeIcon className='chat-window__icon' icon={faComment} />
        </Card>
      </article>
      <article className="chat-window__chats">
        <Card title='Public Chats'>
          <ChatPublicTable chats={chats} />
        </Card>
      </article>
    </section>
  );
}