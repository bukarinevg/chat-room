
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <section className='login'>         
                {children}
        </section>
    );
}