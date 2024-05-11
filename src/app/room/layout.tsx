export default function Layout(
    { children }: { children: React.ReactNode }
){
    return(
        <main>
            <h1>Room</h1>
            <article>{children}</article>
        </main>
    )
}