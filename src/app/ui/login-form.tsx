'use client';

import '@styles/login-form.scss';
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { oAuth } from '@/lib/actions';
import Button from './button';


export default function LoginForm() {
    const searchParams = useSearchParams(); // Get query parameters from the URL.
    const callbackUrl = "/chat";

    return (
        <section className='login-form'>
            <h2> Login </h2>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' />
                <Button className='login-form__submit' type='submit'>Login</Button>
                <a
                    className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                    style={{ backgroundColor: "#ffffff", color: "gray" }}
                    onClick={() => signIn("google", { callbackUrl })}
                    role="button"
                >
                Continue with Google
            </a>
            </form>
            
        </section>
    );
}