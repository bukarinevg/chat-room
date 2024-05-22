'use client';

import '@styles/login-form.scss';
import Button from './button';

export default function LoginForm() {
    return (
        <section className='login-form'>
            <h2> Login </h2>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' />
                <Button className='login-form__submit' type='submit'>Login</Button>
                
            </form>
        </section>
    );
}