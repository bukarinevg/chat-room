import "@styles/chat.scss";
import Sidenav from "@ui/sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Layout(
    { children }: { children: React.ReactNode }
){
    return(
        <>
            <header>
                <FontAwesomeIcon icon={faUser} />
            </header>
            <main>
                <Sidenav />
                <div className="content">{children}</div>
            </main>
        </>

    )
}