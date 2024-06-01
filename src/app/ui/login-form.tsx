'use client';

import '@styles/login-form.scss';
import { signIn } from "next-auth/react";
// import { useSearchParams, useRouter } from "next/navigation";
import { oAuth } from '@/lib/actions';
import Button from './button';


export default function LoginForm() {
    const callbackUrl = "/chat";

    return (
        <section className='login-form block'>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' />
                <Button className='login-form__submit' type='submit'>Login</Button>

                <a
                    className="login-form__google"
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