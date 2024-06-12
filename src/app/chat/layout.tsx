import "@styles/chat.scss";
import Sidenav from "@components/sidenav";
import Header from "@/components/header";

import { UserDetails, UserSesionInterface } from "@/lib/types";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { getUserChats, getUsersInformation } from "@/lib/dataProviders";

export default async function Layout(
    { children }: { children: React.ReactNode }
){
    const session: UserSesionInterface | null = await getServerSession(authOptions);
    if(!session || !session?.user || !session?.user?.id ){
        return null;
    }
    const id = session.user.id;   
    const users = await getUsersInformation();
    const chats = await getUserChats(session.user.id);
    

    return(
        <>
        {/* <SessionProvider session={session}> */}
            <Header 
                id={id}
                email={session?.user?.email} 
                users={users as UserDetails[]}
            />
            <main>
                <Sidenav
                    chats={chats}
                />
                <div className="content">{children}</div>
            </main>
        {/* </SessionProvider> */}
        </>


    )
}