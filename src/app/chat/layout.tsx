import "@styles/chat.scss";
import Sidenav from "@components/sidenav";
import Header from "@/components/header";

import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";



export default async function Layout(
    { children }: { children: React.ReactNode }
){
    const session = await getServerSession(authOptions);
    
    return(
        <>
        {/* <SessionProvider session={session}> */}
            <Header 
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