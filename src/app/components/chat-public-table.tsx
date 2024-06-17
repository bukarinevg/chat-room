'use client';

import { joinChat } from "@lib/actions";
import { Chat } from "@lib/types";
import { LoadingContext } from "@components/providers/LoadingProvider";
import Button from "@components/button";

import { faCheck, faRightToBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useContext } from "react";


export default function ChatPublicTable(
    {chats}: {chats: Array<Chat>}
){
    const userId = useSession().data?.user?.id;
    const { setLoading} = useContext(LoadingContext);
    

    const handleJoinChat = (chatId: number) => {
        setLoading(true);
        joinChat(Number(userId), chatId);
    }

    const publicChats = chats.map((chat) => {{
        return {
            id: chat.id,
            name: chat.name,
            users: chat.users?.length,
            messages: chat.messages?.length,
            member: chat.users?.filter((user) => user.id === Number(userId))
        }
    }});
    

    return (
        <table className='chat-window__chats__table'>
        <thead>
          <tr>
            <th>Chat Name</th>
            <th>Users</th>
            <th>Messages</th>
            <th>Member</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {publicChats.map((chat) => {
            return (
              <tr key={chat.id}>
                <td>{chat.name}</td>
                <td>{chat.users}</td>
                <td>{chat.messages}</td>
                <td>
                    {
                        chat.member?.length ? 
                        <FontAwesomeIcon className="icon" icon={faCheck} /> : 
                        <FontAwesomeIcon className="icon" icon={faXmark} />
                    }
                </td>
                <td>
                  <Button 
                    onClick={() => handleJoinChat(chat.id)}
                  >
                    <FontAwesomeIcon className="icon" icon={faRightToBracket} title='Join' />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    );
} 