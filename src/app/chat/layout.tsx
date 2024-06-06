import "@styles/chat.scss";
import Sidenav from "@components/sidenav";
import Header from "@/components/header";

import { UserSesionInterface } from "@/lib/types";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export default async function Layout(
    { children }: { children: React.ReactNode }
){
    const session: UserSesionInterface | null = await getServerSession(authOptions);
    if(!session || !session?.user || !session?.user?.id ){
        return null;
    }
    const id = session.user.id;    
    return(
        <>
        {/* <SessionProvider session={session}> */}
            <Header 
                id={id}
                email={session?.user?.email} 
            />
            <main>
                <Sidenav />
                <div className="content">{children}</div>
            </main>
        {/* </SessionProvider> */}
        </>


    )
}