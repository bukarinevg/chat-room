import "@styles/room.scss";
import Sidenav from "@ui/sidenav";

export default function Layout(
    { children }: { children: React.ReactNode }
){
    return(
        <main>
            <Sidenav />
            <div>{children}</div>
        </main>
    )
}