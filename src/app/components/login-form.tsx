'use client';

import '@styles/login-form.scss';
import Button from '@components/button';
import Spinner from '@components/spinner';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import {  useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


export default function LoginForm() {
    const[error, setError] = useState<null|string>(null);
    const[loading, setLoading] = useState<boolean>(false);
    const callbackUrl = "/chat";
    const router = useRouter();
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const signInResponse = await signIn("credentials", {
            email:  (e.target as HTMLFormElement).email.value,
            password: (e.target as HTMLFormElement).password.value,
            redirect: false,
        });

        if( signInResponse && !signInResponse.error){
            router.push(callbackUrl);
        }
        else{
            setLoading(false);
            setError('Wrong credentials');
        }
    }
    
    return (
        <section className='login-form block'>
            {
                    loading &&
                    <Spinner />
            }
            <form
                style={{
                    display: loading ? 'none' : 'block'
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' required />
                {
                    error && 
                    <p className='login-form__error'>
                        {error}
                    </p>
                }
                <Button className='login-form__submit' type='submit'>Login</Button>
                <a
                    className="login-form__oauth"
                    onClick={
                        () => 
                            signIn("google", { 
                                callbackUrl,
                                redirect: false
                        })

                    }
                    role="button"
                >
                    <FontAwesomeIcon 
                        icon={faGoogle} 
                        className='login-form__oauth__icon' 
                        /> 
                   Continue with Google
                </a>
            </form>
        </section>
    );
}